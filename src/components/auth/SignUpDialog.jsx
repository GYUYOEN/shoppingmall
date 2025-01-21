import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SignUpDialog = ({ open, onOpenChange }) => {
    const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>회원가입이 완료되었습니다!</DialogTitle>
          <DialogDescription>배송지를 지금 설정하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => navigate("/login")}
            className="flex-1 border-[#FF7976] text-[#FF7976] hover:bg-[#FF7976] hover:text-white"
          >
            다음에 하기
          </Button>
          <Button
            onClick={() => navigate("/shipping")}
            className="flex-1 bg-[#FF7976] hover:bg-[#E86E6B]"
          >
            지금 설정하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpDialog;
