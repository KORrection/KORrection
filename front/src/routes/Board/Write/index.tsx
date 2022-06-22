import { FormEvent, useState } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js/dist/Draft.css';

import DropDown from 'routes/_shared/DropDown';
import styles from './write.module.scss';
import TextEditor from './TextEditor';
import { postApi } from 'services';
import { Button } from 'routes/_shared/Button';

const DROPDOWN_CATEGORIES = ['전체', '자유', '한국어 질문'];

const Write = () => {
  const [currentCategory, setCurrentCategory] = useState('전체');
  const [inputVal, setInputVal] = useState('');
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const html = stateToHTML(editorState.getCurrentContent());

    postApi('board/posts', {
      category: 'free',
      title: inputVal,
      content: html,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputVal(e.currentTarget.value);
  };

  return (
    <section className={styles.pageContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.titleContainer}>
          <DropDown selectList={DROPDOWN_CATEGORIES} setCurrentSelect={setCurrentCategory} size='small'>
            {currentCategory}
          </DropDown>
          <input type='text' name='title' placeholder='글 제목' value={inputVal} onChange={handleInputChange} />
        </div>

        <TextEditor editorState={editorState} setEditorState={setEditorState} />
        <div className={styles.buttonWrapper}>
          <Button type='submit' size='large' primary>
            save
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Write;
