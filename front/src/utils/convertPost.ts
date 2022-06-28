import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

export const convertHtmlToDraft = (content: string): EditorState => {
  const blocksFromHtml = htmlToDraft(content);

  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

  return EditorState.createWithContent(contentState);
};
