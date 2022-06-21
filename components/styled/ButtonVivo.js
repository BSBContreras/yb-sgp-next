import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomButtom = styled(Button)(theme => ({
  borderRadius: 0
}))

export default function CustomizedButtons(props) {
  return <CustomButtom {...props} />;
}
