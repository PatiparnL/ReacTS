import React from "react";
import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from "@material-ui/core";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

interface HeaderProp {
    title: string,
    haveShoppingIcon?: boolean
}

export const Header: React.FC<HeaderProp> = ({ title, haveShoppingIcon = false }) => {
    return <>
        <AppBar position="static" style={{ color: '#000', backgroundImage: 'linear-gradient(to bottom, #f5f5f5 0%, #e8e8e8 100%)' }}>
            <Toolbar id="back-to-top-anchor" style={{ minHeight: '0px' }} />
            <Toolbar>
                <div style={{ width: "80%" }}>
                    <Typography variant="h6" color="inherit" >
                        {title}
                    </Typography>
                </div>
                {
                    haveShoppingIcon
                        ? (<div style={{ width: "20%" }}>
                            <Box display="flex" justifyContent="flex-end">
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <Badge badgeContent={4} color="secondary">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Box>
                        </div>)
                        : null
                }

            </Toolbar>
        </AppBar>
    </>
}