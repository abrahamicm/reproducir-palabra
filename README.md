# Reproducir Palabras - Extensión de Visual Studio Code

Esta extensión para Visual Studio Code permite reproducir texto seleccionado y la última palabra escrita mediante la síntesis de voz. Utiliza la biblioteca [say](https://www.npmjs.com/package/say) para interactuar con las voces del sistema operativo.

## Características

- **Reproducir texto seleccionado**: Selecciona un texto en el editor y usa un comando para que sea leído en voz alta.
- **Reproducir la última palabra**: Cada vez que escribes una palabra y presionas espacio, la última palabra es reproducida automáticamente.
- **Listar voces instaladas**: Obtiene y muestra una lista de las voces de síntesis de voz disponibles en tu sistema.



## Uso

### Comandos

1. **Reproducir Texto Seleccionado**: 
   - Selecciona un texto en el editor.
   - Abre la paleta de comandos (`Ctrl+Shift+P` o `Cmd+Shift+P`) y busca `Reproducir Palabra: Reproducir Selección`.

2. **Reproducir la Última Palabra**: 
   - Simplemente escribe una palabra y presiona espacio. La palabra será reproducida automáticamente.

3. **Listar Voces Instaladas**: 
   - Abre la paleta de comandos y busca `Reproducir Palabra: Listar Voces`.

## Cómo Funciona

La extensión está diseñada para:

- Reproducir el texto seleccionado utilizando la función `speak` de la biblioteca `say`.
- Monitorizar cambios en el documento y, al detectar un espacio en blanco, extraer y reproducir la última palabra escrita.
- Obtener las voces disponibles en el sistema utilizando la función `getInstalledVoices` de la biblioteca `say`.

## Dependencias

- [say](https://www.npmjs.com/package/say): Para la síntesis de voz.
  
## Contribuciones

Las contribuciones son bienvenidas. Si tienes alguna idea para mejorar la extensión o encuentras un error, no dudes en abrir un problema o enviar una solicitud de extracción.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.


