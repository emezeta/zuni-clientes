import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  props: {
    MuiInput: {
      color: 'secondary',
    },
    MuiTextField: {
      color: 'secondary',
    },
    MuiInputLabel: {
      color: 'secondary',
    },
  },
  palette: {
    primary: {
      main: '#f8cc46',
      contrastText: '#353a52',
      light: 'pink',
    },
    secondary: {
      main: '#00128b',
    },
  },
})
