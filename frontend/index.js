
// Import styling
import './styles/index.scss';

// Import dependencies
import React            from 'react';
import ReactDOM         from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';


const Chotis = () => (
    <MuiThemeProvider>
        <AppBar title="Chotis" />
    </MuiThemeProvider>
);

ReactDOM.render(<Chotis/>, document.getElementById('chotis'));