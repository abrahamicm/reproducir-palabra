import * as vscode from 'vscode';
import Say from 'say';  // Importa Say

export function activate(context: vscode.ExtensionContext) {
	// Comando para reproducir el texto seleccionado
	let reproducirSeleccion = vscode.commands.registerCommand('reproducir-palabra.reproducirSeleccion', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const selection = editor.selection;
			const selectedText = removeAccents(editor.document.getText(selection));

			if (selectedText) {
				const voice = 'Google US English'; // Especifica una voz en inglés
				const speed = 1.0; // Velocidad de reproducción

				// Utiliza Say para reproducir el texto
				Say.speak(selectedText, voice, speed, (err: any) => {
					if (err) {
						vscode.window.showErrorMessage(`Error al reproducir el texto: ${err}`);
					}
				});
			} else {
				vscode.window.showInformationMessage('No hay texto seleccionado.');
			}
		} else {
			vscode.window.showInformationMessage('No hay un editor activo.');
		}
	});


	// Comando para listar voces
	let listarVoces = vscode.commands.registerCommand('reproducir-palabra.listarVoces', () => {
		listarAvailableVoices();
	});

	context.subscriptions.push(reproducirSeleccion);
	context.subscriptions.push(listarVoces);
	context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((e) => {
		const editor = vscode.window.activeTextEditor;

		if (editor && e.contentChanges.length > 0) {
			const change = e.contentChanges[0]; // Obtener el primer cambio
			const text = change.text; // Texto que fue cambiado
			const position = change.range.start; // Posición donde ocurrió el cambio

			// Si el texto agregado es un espacio en blanco
			if (/^\s+$/.test(text)) {
				// Obtener el texto hasta el punto antes del cambio
				const fullText = editor.document.getText(new vscode.Range(0, 0, position.line, position.character)).trim();

				// Encontrar la última palabra
				const lastWord = getLastWord(fullText);

				if (lastWord) {
					speakWord(lastWord); // Llamar a la función para reproducir la palabra
				}
			}
		}
	}));

}

export function deactivate() { }

// Función para eliminar acentos de un texto
function removeAccents(text: string) {
	return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Función para obtener la última palabra escrita
// Función para obtener la última palabra
function getLastWord(text: string): string | null {
	// Recorrer el texto desde el final hacia el principio
	for (let i = text.length - 1; i >= 0; i--) {
		if (text[i] === ' ') {
			// Si encontramos un espacio, obtenemos la palabra
			return text.slice(i + 1); // Retornamos el texto desde el siguiente carácter
		}
	}
	// Si no encontramos espacios, retornamos toda la cadena
	return text.length > 0 ? text : null;
}
// Función para listar voces disponibles
function listarAvailableVoices() {
	Say.getInstalledVoices((err: any, voices: string[]) => {
		if (err) {
			vscode.window.showErrorMessage('Error al obtener las voces instaladas: ' + err.message);
			return;
		}

		// Crear un mensaje con las voces
		let mensaje = 'Voces instaladas:\n';
		voices.forEach((voice: string, index: number) => {
			mensaje += `${index + 1}: ${voice}\n`; // Ajusta esto según la estructura de tu voz
		});

		// Mostrar las voces en una notificación
		vscode.window.showInformationMessage(mensaje);
	});
}

function speakWord(word: string) {

	const voice = 'Microsoft David Desktop'; // Especifica la voz en inglés que deseas usar
	const speed = 1.0; // Ajusta la velocidad de reproducción

	// Utiliza Say para reproducir la palabra
	Say.speak(word, voice, speed, (err: any) => {
		if (err) {
			vscode.window.showErrorMessage(`Error al reproducir la palabra: ${err}`);
		}
	});
}