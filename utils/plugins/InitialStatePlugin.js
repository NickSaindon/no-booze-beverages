import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { $getRoot, $getSelection, $setSelection } from "lexical";
import {$generateNodesFromDOM} from '@lexical/html';

const InitialStatePlugin = ({htmlString}) => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {

        editor.update(() => {
        
        const parser = new DOMParser();
        const dom = parser.parseFromString(htmlString, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
    
        // Select the root
        $getRoot().select();
        console.log('Editor', nodes)

        // Insert them at a selection.
        const selection = $getSelection();
        selection.insertNodes(nodes);
        console.log('Selection', selection)

        $setSelection(null);
        });
    }, [editor]);
    return null;
  }

  export default InitialStatePlugin;