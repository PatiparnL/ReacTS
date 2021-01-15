import React from 'react';
import { Box } from "@material-ui/core";
import { motion } from "framer-motion";

interface Props {
  index: any;
  value: any;
  style: any
}

export const TabPanel: React.FC<Props> = ({ children, index, value, style }) => {

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      {...style}
    >
      <motion.div 
        initial={{opacity: 0}} 
        animate={{ opacity: value === index ? 1 : 0}}
        transition={{ duration: 1 }}>
        {value === index && <Box style={{ marginTop: "2em" }}>{children}</Box>}
      </motion.div>
    </div>
  );
}