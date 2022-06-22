import { Editor, EditorState, RichUtils, DraftEditorCommand } from 'draft-js';
import { Dispatch, MouseEvent, SetStateAction } from 'react';

import styles from './write.module.scss';

interface IProps {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
}

const TextEditor = ({ editorState, setEditorState }: IProps) => {
  const handleTogggleClick = (e: MouseEvent, inlineStyle: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleBlockClick = (e: MouseEvent, blockType: string) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.buttonContainer}>
        <button type='button' onMouseDown={(e) => handleBlockClick(e, 'header-one')}>
          h1
        </button>
        <button type='button' onMouseDown={(e) => handleBlockClick(e, 'header-two')}>
          h2
        </button>
        <button type='button' onMouseDown={(e) => handleBlockClick(e, 'header-three')}>
          h3
        </button>
        <button type='button' onMouseDown={(e) => handleBlockClick(e, 'unstyled')}>
          normal
        </button>
        <button type='button' onMouseDown={(e) => handleTogggleClick(e, 'BOLD')}>
          bold
        </button>
        <button type='button' onMouseDown={(e) => handleTogggleClick(e, 'ITALIC')}>
          italic
        </button>
        <button type='button' onMouseDown={(e) => handleTogggleClick(e, 'STRIKETHROUGH')}>
          strikthrough
        </button>
        <button type='button' onMouseDown={(e) => handleBlockClick(e, 'ordered-list-item')}>
          ol
        </button>
        <button type='button' onMouseDown={(e) => handleBlockClick(e, 'unordered-list-item')}>
          ul
        </button>
      </div>
      <div className={styles.editor}>
        <Editor editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand} />
      </div>
    </div>
  );
};

export default TextEditor;
