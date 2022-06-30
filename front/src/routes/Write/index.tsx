import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js/dist/Draft.css';

import { postApi } from 'services/axios';

import DropDown from 'routes/_shared/DropDown';
import Button from 'routes/_shared/Button';
import TextEditor from 'routes/_shared/TextEditor';
import styles from './write.module.scss';

const DROPDOWN_CATEGORIES = ['자유', '한국어 질문'];

const Write = () => {
  const navigate = useNavigate();

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
      .then(() => navigate('/board'))
      .catch((err) => console.error(err));
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleCancelClick = () => {
    navigate('/board');
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
          <Button type='button' size='large' onClick={handleCancelClick}>
            cancel
          </Button>
          <Button type='submit' size='large' primary>
            save
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Write;
