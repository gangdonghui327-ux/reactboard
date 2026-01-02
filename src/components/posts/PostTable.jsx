import { Link } from 'react-router'
import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import dayjs from 'dayjs';

function PostTable({ posts }) {

    const lists = posts ? posts : [];
    return (
        <TableContainer sx={{ mt: 3 }}>
            <Table>
                {/* 테이블 머릿말 */}
                <TableHead>
                    <TableRow sx={{
                        '&th': {// row 안에 있는 모든 <th>셀에 스타일 적용
                            borderBottom: '1px solid #EEEEEE',
                            fontSize: 14,
                            fontWeight: 500,
                            color: '#222831',
                        }
                    }}>
                        <TableCell align='center' width={80}>번호</TableCell>
                        <TableCell>제목</TableCell>
                        <TableCell align='center' width={160}>작성자</TableCell>
                        <TableCell align='center' width={80}>조회수</TableCell>
                        <TableCell align='center' width={180}>작성일</TableCell>
                    </TableRow>
                </TableHead>

                {/* 테이블 본문 */}
                <TableBody>
                    {
                        lists.map(({ id, title, readCount, createAt, author }) => (
                            <TableRow key={id}
                                hover sx={{ '& td': { fontSize: 15, borderBottom: '1px solid #eeeeee' } }} // 마우스를 올렸을 때 이벤트
                            >
                                <TableCell align='center'>{id}</TableCell>
                                <TableCell>
                                    <Typography component={Link} to={`/posts/${id}`}
                                        sx={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit', '&:hover': { color: 'primary.main' } }}>
                                        {title}
                                    </Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    {
                                        author?.nickname && author.nickname !== '익명' ? (
                                            <Chip label={author.nickname} size='small' sx={{ borderRadius: 999, px: 2, height: 25, fontSize: 13, bgcolor: '#00ADB5' }} />
                                        ) : (
                                            <Typography sx={{ fontSize: 14 }}>{author?.nickname || '익명'}</Typography>
                                        )}

                                </TableCell>
                                <TableCell align='center'>{readCount}</TableCell>
                                <TableCell align='center' sx={{ color: '#00ADB5' }}>
                                    {/* {new Date(createAt).toLocaleString()} */}
                                    {dayjs(createAt).format('YY년MM월DD일 HH.mm')}
                                </TableCell>
                            </TableRow>
                        ))
                    }

                    {/* 게시글이 하나도 없을 때 */}
                    {
                        lists.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align='center' sx={{ py: 5 }}>
                                    게시글이 없습니다.
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default PostTable;