import variable from "./../variables/platform";

export default (variables = variable) => {
  const cardTheme = {
    ".transparent": {
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      shadowRadius: null,
      elevation: null
    },
    marginVertical: 6,
    marginHorizontal: 3,
    flex: 1,
    borderWidth: variables.borderWidth,
    borderRadius: 1,
    borderColor: variables.cardBorderColor,
    flexWrap: "wrap",
    backgroundColor: variables.cardDefaultBg,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 1.5,
    elevation: 1
  };

  return cardTheme;
};
