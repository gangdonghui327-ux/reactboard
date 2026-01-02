import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router';
import { BiBody } from "react-icons/bi";
import { useQueryClient } from '@tanstack/react-query';
import { useMe } from '../hooks/useMe';
import { clearAuth } from '../api/authApi';

function AppLayout() {
    const queryClient = useQueryClient();
    // 사용자 정보 훅
    const { data: me, isLoading: meIsLoading } = useMe();
    const navigate = useNavigate();

    // 로그아웃 이벤트 핸들러
    const handleLogout = () => {
        clearAuth();
        queryClient.setQueryData(['me'], null);// 즉시 UI 반영
        navigate("/posts");
    }


    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#EEEEEE' }}>
            {/* header */}
            <Box component="header" sx={{
                position: 'fixed',
                top: 0,
                zIndex: 10,
                bgcolor: '#222831',
                borderBottom: '1px solid #222831',
                width: '100%',
            }}>
                <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
                    <Box component={Link} to="/posts"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',// flex일 때 가능한 위 아래 중앙 정렬
                            textDecoration: 'none'
                        }}>
                        <Box sx={{
                            width: 40, height: 40,
                            borderRadius: '50%',// 모서리 둥글게 처리
                            bgcolor: '#EEEEEE',
                            display: 'grid', // 바둑판 형태의 레이아웃 스타일
                            placeItems: 'center', // grid 일 때만 적용 가능한 x, y 축 중앙 정렬
                            mr: 1.5
                        }}>
                            <BiBody style={{ color: '#222831', fontSize: 22 }} />
                        </Box>
                        <Typography variant='h6' sx={{ fontWeight: 700, color: '#EEEEEE' }}>
                            게시판
                        </Typography>
                    </Box>

                    {/* 오른쪽 메뉴: 회원가입/로그인 */}
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        {!meIsLoading && me ? (
                            <Button variant='text' sx={{ fontWeight: 500, color: '#EEEEEE', fontSize: 14 }} onClick={handleLogout}>로그아웃</Button>
                        ) : (
                            <>
                                <Button component={Link} to="/auth/login" variant='text' sx={{ fontWeight: 500, color: '#EEEEEE', fontSize: 14 }}>로그인</Button>
                                <Button component={Link} to="/auth/register" variant='text' sx={{ fontWeight: 500, color: '#EEEEEE', fontSize: 14 }}>회원가입</Button>
                            </>
                        )}
                    </Stack>
                </Container>
            </Box >
            공통 레이아웃

            {/* 자식 컴포넌트(본문) 영역 */}
            <Container maxWidth="md" sx={{ pt: 10, mb: 4 }}>
                <Outlet />
            </Container>
        </Box >
    );
}

export default AppLayout;