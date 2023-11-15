import React from "react";
import {
    Box,
    Typography
} from '@mui/material'
import PropTypes from 'prop-types'
import { FixMeLater } from "../../../types/FixMeLater";

function UsersLayoutTab(props: FixMeLater) {//
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
}
  
UsersLayoutTab.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default UsersLayoutTab