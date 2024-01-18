import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {useEffect} from 'react';
import { $generateHtmlFromNodes } from "@lexical/html";
import {$generateNodesFromDOM} from '@lexical/html';

 export default function OnChangePlugin({ onChange, value }) {
    // Access the editor through the LexicalComposerContext
    const [editor] = useLexicalComposerContext();
    // const [isFirstRender, setIsFirstRender] = useState(true);

    // Wrap our listener in useEffect to handle the teardown and avoid stale references.
    useEffect(() => {
      // most listeners return a teardown function that can be called to clean them up.
      return editor.registerUpdateListener(({editorState}) => {
        // call onChange here to pass the latest state up to the parent.
        // const htmlString = $generateHtmlFromNodes(editor, null)


        editor.update(() => {
            const htmlString = $generateHtmlFromNodes(editor, null);
            onChange({ content: htmlString, editorState })
         });
      });
    }, [editor, onChange]);
  
  }