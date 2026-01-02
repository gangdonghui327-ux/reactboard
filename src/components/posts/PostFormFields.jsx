import { TextField } from '@mui/material';

function PostFormFields({ title, content, onChangeTitle, onChangeContent }) {
    return (
        <>
            <TextField placeholder='제목'
                value={title}
                onChange={(e) => onChangeTitle(e.target.value)}
            />
            <TextField placeholder='내용'
                value={content}
                onChange={(e) => onChangeContent(e.target.value)}
                multiline
                minRows={8}
            />
        </>
    );
}

export default PostFormFields;