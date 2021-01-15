//https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb

import React, { ComponentType } from "react";
import { Redirect } from "react-router";

export interface RequireAuthProps {
    auth?: boolean | null | undefined;
    checkAuth?: ((token: string | null) => any) | undefined;
}

export const requireAuth = <P extends object>(Component: ComponentType<P>) => {
    return class ComposedComponent extends React.Component<P & RequireAuthProps> {

        state = { haveAuth: true };

        componentDidMount() {
            const { checkAuth, auth } = this.props;
            if (auth === null || !auth) {
                if (checkAuth) {
                    checkAuth(localStorage.getItem('token'));
                }
            }
        }

        componentDidUpdate() {
            const { auth } = this.props;
            if (auth === null || !auth) {
                this.setState({ haveAuth: false })
            }
        }

        render() {
            const { ...props } = this.props;
            return this.state.haveAuth ? <Component {...props as P} /> : <Redirect to="/error" />
        }
    }
}
