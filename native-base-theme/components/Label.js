import variable from "./../variables/platform";
import Ui from '../../js/common/ui'
export default (variables = variable) => {
  const labelTheme = {
    ".focused": Ui.inputLabelFocused,
    fontSize: 17
  };

  return labelTheme;
};
