import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { Box, Paper, Typography } from '@mui/material'
import { fetchPosts } from '../../api/postsApi';
import { useState } from 'react';
import Loader from '../../components/common/Loader'
import ErrorMessage from '../../components/common/ErrorMessage'
import PostSearch from '../../components/posts/PostSearch';
import PostTable from '../../components/posts/PostTable';
import PagePagination from '../../components/posts/PostPagination';
import { useMe } from '../../hooks/useMe'

function PostList() {
    // 페이지내이션. page상태 관리
    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState('');
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts', page, keyword], // page, keyword가 바뀌면 새로운 데이터를 가져옴
        queryFn: () => fetchPosts({ page, size: 10, keyword }),
        placeholderData: keepPreviousData // 페이지 전환(이동)시 기존 데이터 유지
    });

    const { data: me, isLoading: meIsLoading } = useMe();

    if (isLoading) return <Loader />;
    if (isError) return <ErrorMessage error={error} />

    const { content, totalPages } = data;

    //====== 이벤트 핸들러
    // 검색 
    const handleSearch = (evt) => {
        evt.preventDefault();
        setPage(0);
    }

    // 페이지 이동 
    const handlePrev = () => {
        setPage(prev => Math.max(prev - 1, 0));// 0보다 작아지지 않음
    }

    const handleNext = () => {
        setPage(prev => (prev + 1 < totalPages ? prev + 1 : prev));
    }

    return (
        <Box>
            <Paper elevation={0} sx={{
                width: '100%',
                borderRadius: 3,
                px: 4,
                py: 3,
                boxShadow: '0 16px 40px rgba(0,0,0, 0.07)'// 'x축 y축 번짐값 컬러(rgba의 a는 alpha값으로 투명도 조절)
            }}>
                <Box>
                    {/* 제목 */}
                    <Typography variant='h5' sx={{ fontWeight: 700, fontSize: 24, mb: 3 }}>
                        게시글 목록
                    </Typography>

                    {/* 검색 */}
                    <PostSearch
                        keyword={keyword}
                        onSubmit={handleSearch}
                        onChangeKeyword={setKeyword}
                    />

                    {/* 테이블 */}
                    <PostTable posts={content} />

                    {/* 페이지네이션 + 새 글 버튼 */}
                    <PagePagination
                        page={page}
                        totalPages={totalPages}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        logined={!meIsLoading && !!me} // 로딩상태 true, 데이터 true 일때 -> true
                    />

                </Box>
            </Paper>

        </Box>
    );
}

export default PostList;