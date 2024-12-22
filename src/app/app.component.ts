import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Librerías de análisis
import ColorThief from 'colorthief';
import Tesseract from 'tesseract.js';

@Component({
  standalone: true,            // No depende de un NgModule
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule]
})
export class AppComponent {
  selectedFile: File | null = null;
  image: string | null = null;
  analysisResult: string = '';

  // ============== MANEJO DE ARCHIVOS ==============
  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;
    const reader = new FileReader();

    reader.onload = () => {
      this.image = reader.result as string;
      this.analysisResult = ''; // Limpia veredictos anteriores
    };
    reader.readAsDataURL(file);
  }

  // ============== BOTÓN "ANALIZAR" ==============
  async analyzeThumbnail(): Promise<void> {
    if (!this.image) return;
    try {
      this.analysisResult = 'Analizando...';

      // 1) Color dominante (imagen original)
      const dominantColor = await this.getDominantColor(this.image);

      // 2) Texto con preprocesado + Tesseract
      const detectedText = await this.getDetectedText(this.image);

      // 3) Veredictos
      const colorVerdict = this.evaluateColor(dominantColor);
      const textVerdict  = this.evaluateText(detectedText);
      const conclusion   = this.finalConclusion(colorVerdict, textVerdict);

      // 4) Componer resultado final
      this.analysisResult = `
        Color dominante: rgb(${dominantColor.join(', ')})
        → ${colorVerdict}

        Texto detectado: "${detectedText}"
        → ${textVerdict}

        Conclusión: ${conclusion}
      `;
    } catch (error) {
      console.error('Error en el análisis:', error);
      this.analysisResult = 'Ocurrió un error al analizar la imagen.';
    }
  }

  // ============== 1) OBTENER COLOR DOMINANTE (ORIGINAL) ==============
  getDominantColor(dataUrl: string): Promise<number[]> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = dataUrl;
      img.onload = () => {
        try {
          const colorThief = new ColorThief();
          const color = colorThief.getColor(img);
          resolve(color);
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = (e) => reject(e);
    });
  }

  // ============== 2) PREPROCESAR IMAGEN PARA OCR ==============
  private async preprocessImage(originalDataUrl: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = originalDataUrl;

      img.onload = () => {
        // Creamos un canvas del mismo tamaño que la imagen
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        // Dibujamos la imagen
        ctx.drawImage(img, 0, 0);

        // Obtenemos el array de pixeles
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Pasar a escala de grises + umbral (threshold)
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Escala de grises
          const gray = 0.3 * r + 0.59 * g + 0.11 * b;
          // Umbral en ~128 (ajusta si lo deseas)
          const bin = (gray > 128) ? 255 : 0;
          data[i]     = bin; // R
          data[i + 1] = bin; // G
          data[i + 2] = bin; // B
        }

        // Guardamos la imagen modificada en el canvas
        ctx.putImageData(imageData, 0, 0);

        // Creamos un nuevo dataURL binarizado
        const processedDataUrl = canvas.toDataURL('image/png');
        resolve(processedDataUrl);
      };

      img.onerror = (err) => reject(err);
    });
  }

  // ============== 3) USAR TESSERACT PARA EXTRAER TEXTO (CON PREPROCESADO) ==============
  async getDetectedText(dataUrl: string): Promise<string> {
    // Preprocesar la imagen para mejorar OCR
    const processedDataUrl = await this.preprocessImage(dataUrl);

    // Forzamos cast a 'any' si queremos usar config
    const TesseractAny = Tesseract as any;

    // Llamada a Tesseract
    const { data } = await TesseractAny.recognize(processedDataUrl, 'eng', {
      config: {
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        tessedit_pageseg_mode: '3'
      }
    });
    return data.text.trim();
  }

  // ============== VEREDICTOS FINALES ==============
  evaluateColor(rgb: number[]): string {
    const [r, g, b] = rgb;
    const brightness = (r + g + b) / 3;
    if (brightness < 80) {
      return 'Color muy oscuro, podría no destacar.';
    } else if (brightness > 200) {
      return 'Color muy claro, cuida el contraste.';
    }
    return 'Color equilibrado.';
  }

  evaluateText(text: string): string {
    if (!text) return 'No se detecta texto.';
    if (text.length > 30) {
      return 'Mucho texto detectado, podría saturar el thumbnail.';
    }
    return 'Texto en cantidades razonables.';
  }

  finalConclusion(colorVerdict: string, textVerdict: string): string {
    const colorOk = !colorVerdict.includes('oscuro') && !colorVerdict.includes('claro');
    const textOk = !textVerdict.includes('Mucho texto');

    if (colorOk && textOk) return '¡El thumbnail se ve bastante bien!';
    if (!colorOk && !textOk) return 'Revisa tanto los colores como el texto.';
    if (!colorOk) return 'Ajusta un poco los colores.';
    return 'Podrías reducir la cantidad de texto.';
  }
}

