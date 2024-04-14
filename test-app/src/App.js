import * as React from "react";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function App() {
  const totalStep = 10;

  const [activeStep, setActiveStep] = React.useState(0);

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
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {activeStep !== 0 && ( // 0단계가 아닐 때만 이전 버튼을 표시
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
