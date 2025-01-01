# Thumbnail Analyzer

**[Español](#español)** | **[English](#english)**

## Español

Este proyecto está desarrollado en Angular y tiene como objetivo **analizar thumbnails para YouTube** (imágenes de vista previa), permitiendo ver rápidamente **cómo están distribuidos los colores y el uso de texto** en la miniatura, ayudándote a evaluar si la imagen está muy saturada de color o si hay demasiado texto.

### Tabla de Contenidos
- [Descripción](#descripción)
- [Demo](#demo)
- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

### Descripción
**Thumbnail Analyzer** es una aplicación que te permite subir o seleccionar thumbnails de YouTube para **analizar la distribución de colores y la cantidad de texto** que contienen. De esta forma, puedes detectar si tu miniatura está sobrecargada (demasiados colores saturados o mucho texto), o si está bien equilibrada visualmente.  
Está construida con **Angular**, y se puede desplegar fácilmente en GitHub Pages.

### Demo
Puedes ver la aplicación en funcionamiento en:  
[**Thumbnail Analyzer Demo**](https://mnovacov.github.io/thumbnail-analyzer/)

### Características
1. **Carga de imágenes**: puedes arrastrar o seleccionar imágenes para analizarlas.  
2. **Análisis de colores**: detecta la intensidad de los colores y la saturación.  
3. **Conteo de texto**: revisa cuántas palabras o caracteres contiene el thumbnail.  
4. **Interfaz amigable**: construida con Angular y un estilo sencillo en CSS.  

### Requisitos
- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada)
- [npm](https://www.npmjs.com/) (instalado con Node.js)
- [Angular CLI](https://angular.io/cli)

### Instalación
1. Clona el repositorio:

    ```bash
    git clone https://github.com/MNovacov/thumbnail-analyzer.git
    ```
2. Ingresa a la carpeta del proyecto:

    ```bash
    cd thumbnail-analyzer
    ```
3. Instala dependencias:

    ```bash
    npm install
    ```

### Uso
- Para **desarrollo local**, ejecuta:

    ```bash
    ng serve
    ```
  Luego abre [http://localhost:4200/](http://localhost:4200/) en tu navegador.

- Para **producción** (por ejemplo, desplegar en GitHub Pages):

    ```bash
    ng build --configuration production
    ```
  Esto generará la carpeta `dist/thumbnail-analyzer` lista para servir.

### Contribución
¡Todas las contribuciones son bienvenidas!  
1. Haz un fork del proyecto.  
2. Crea una rama con tu feature o fix (`git checkout -b feature/nueva-funcionalidad`).  
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`).  
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`).  
5. Abre un Pull Request en este repositorio.  

### Licencia
Este proyecto está bajo la [MIT License](LICENSE). Siéntete libre de usarlo y modificarlo según tus necesidades.

---

## English

This Angular-based project focuses on **analyzing YouTube thumbnails**, allowing you to quickly check **how colors are distributed and how much text** is used in the thumbnail. This helps you determine if the image is overly saturated or if it has too much text.

### Table of Contents
- [Description](#description)
- [Demo](#demo-1)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

### Description
**Thumbnail Analyzer** is a web application that lets you upload or select **YouTube thumbnails** and **analyze their color distribution and text usage**. It helps identify if your thumbnail is overcrowded (too many saturated colors or excessive text) or well-balanced visually.  
It is built with **Angular**, and can be easily deployed to GitHub Pages.

### Demo
Check out the live demo here:  
[**Thumbnail Analyzer Demo**](https://mnovacov.github.io/thumbnail-analyzer/)

### Features
1. **Image Upload**: Drag and drop or select images for analysis.  
2. **Color Analysis**: Detect the intensity of colors and saturation.  
3. **Text Detection**: Check how many words or characters the thumbnail contains.  
4. **User-friendly UI**: Built with Angular and a straightforward CSS design.

### Requirements
- [Node.js](https://nodejs.org/) (version 16+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Angular CLI](https://angular.io/cli)

### Installation
1. Clone the repository:

    ```bash
    git clone https://github.com/MNovacov/thumbnail-analyzer.git
    ```
2. Navigate to the project folder:

    ```bash
    cd thumbnail-analyzer
    ```
3. Install dependencies:

    ```bash
    npm install
    ```

### Usage
- **Local development**:

    ```bash
    ng serve
    ```
  Then open [http://localhost:4200/](http://localhost:4200/) in your browser.

- **Production build** (e.g., for GitHub Pages):

    ```bash
    ng build --configuration production
    ```
  This will generate the `dist/thumbnail-analyzer` folder, ready for deployment.

### Contributing
We welcome all contributions!  
1. Fork the project.  
2. Create a branch for your feature or fix (`git checkout -b feature/new-feature`).  
3. Commit your changes (`git commit -m 'Add new feature'`).  
4. Push your branch (`git push origin feature/new-feature`).  
5. Open a Pull Request in this repository.

### License
This project is released under the [MIT License](LICENSE). Feel free to use and modify it according to your needs.