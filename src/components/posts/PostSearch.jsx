import { Box, Button, TextField } from '@mui/material';

function PostSearch({ onSubmit, keyword, onChangeKeyword }) {
    return (
        <Box component="form"
            onSubmit={onSubmit}
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, }}
        >
            <TextField type='search'
                size='small'
                placeholder='제목 또는 내용 검색'
                value={keyword}
                onChange={(e) => onChangeKeyword(e.target.value)}
                sx={{ width: 260 }}
            />
            <Button type='submit'
                variant='outlined'
                size='small'
                sx={{ borderRadius: 999 }}
            >
                검색
            </Button>
        </Box>
    );
}

export default PostSearch;