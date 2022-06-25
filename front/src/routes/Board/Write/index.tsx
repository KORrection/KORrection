import { FormEvent, useState } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js/dist/Draft.css';

import { postApi } from 'services';

import DropDown from 'routes/_shared/DropDown';
import Button from 'routes/_shared/Button';
import TextEditor from './TextEditor';
import styles from './write.module.scss';

const DROPDOWN_CATEGORIES = ['자유', '한국어 질문'];

const Write = () => {
  const [currentCategory, setCurrentCategory] = useState('자유');
  const [title, setTitle] = useState('');
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const content = stateToHTML(editorState.getCurrentContent());

    postApi('board/posts', {
      category: currentCategory,
      title,
      content,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <section className={styles.pageContainer}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.titleContainer}>
          <DropDown selectList={DROPDOWN_CATEGORIES} setCurrentSelect={setCurrentCategory} size='small'>
            {currentCategory}
          </DropDown>
          <input type='text' name='title' placeholder='글 제목' value={title} onChange={handleInputChange} />
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
