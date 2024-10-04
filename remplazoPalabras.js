try{
  document.addEventListener('DOMContentLoaded', function() {
    function replaceTextsInFontTags() {
      const replacements = {
        'Envío Directo': 'Dropshipper',
        'Academia Dropi': 'Dropi Academy'
      };

      const fontElements = document.getElementsByTagName('font');

      console.log('Cantidad de elementos <font> encontrados:', fontElements.length);

      // Itera sobre cada elemento <font>
      for (let i = 0; i < fontElements.length; i++) {
        const fontElement = fontElements[i];
        // Recorre y reemplaza textos dentro del elemento <font>
        walk(fontElement);
      }

      // Función para recorrer nodos y manejar texto
      function walk(node) {
        let child, next;

        switch (node.nodeType) {
          case 1:  // Elemento
          case 9:  // Documento
          case 11: // Fragmento de documento
            child = node.firstChild;
            while (child) {
              next = child.nextSibling;
              walk(child);
              child = next;
            }
            break;
          case 3: // Nodo de texto
            handleText(node);
            break;
        }
      }

     function handleText(textNode) {
        let text = textNode.nodeValue;
        let originalText = text;
        let found = false;

        for (const [original, replacement] of Object.entries(replacements)) {
          const regex = new RegExp(original, 'gi');
          if (regex.test(text)) {
            console.log(`Texto encontrado: "${original}" en el nodo de texto: "${text}"`);
            found = true;
            text = text.replace(regex, replacement);
          }
        }

        if (found) {
          console.log(`Reemplazando texto del nodo de "${originalText}" a "${text}"`);
          textNode.nodeValue = text;
        }
      }
    }

    setTimeout(replaceTextsInFontTags, 7000);

    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          replaceTextsInFontTags();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
  });
} catch(e){
  console.log('Error no se pudo iniciar');
}
