import * as React from "react";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

function App() {
  const totalStep = 10;
  const [activeStep, setActiveStep] = React.useState(0);
  const [paperSize, setPaperSize] = React.useState({ width: 300, height: 450 });

  // 화면 크기가 변경될 때마다 Paper의 크기를 조절
  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth * 0.8; // 화면 너비의 80%로 설정
      const height = window.innerHeight * 0.7; // 화면 높이의 70%로 설정
      setPaperSize({ width, height });
    };
    handleResize(); // 처음 렌더링 시 크기 설정
    window.addEventListener("resize", handleResize); // 리사이즈 이벤트 핸들러 등록
    return () => window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 이벤트 핸들러 제거
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep < totalStep - 1) return prevActiveStep + 1;
      else return totalStep - 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep > 0) return prevActiveStep - 1;
      else return 0;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "96vh",
        justifyContent: "space-between",
        mt: 1,
      }}
    >
      <Box sx={{ mt: 2 }}>
        <MobileStepper
          variant="dots"
          steps={totalStep}
          position="static"
          activeStep={activeStep}
          sx={{ maxWidth: 400, margin: "auto" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "60vw", // 화면의 80%를 차지하도록 설정
          height: "70vh", // 화면의 70%를 차지하도록 설정
          "@media (max-width: 600px)": {
            width: "90vw", // 모바일 화면에서는 너비를 좀 더 넓게 설정
          },
        }}
      >
        <Paper elevation={3} sx={{ borderRadius: 8, ...paperSize }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "static",
        }}
      >
        {activeStep !== 0 && (
          <Button
            variant="contained"
            size="large"
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            이전
          </Button>
        )}
        {activeStep !== totalStep - 1 && (
          <Button variant="contained" size="large" onClick={handleNext}>
            다음
          </Button>
        )}
        {activeStep === totalStep - 1 && (
          <Button variant="contained" size="large" onClick={handleNext}>
            제출
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default App;
