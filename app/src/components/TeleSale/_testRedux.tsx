import React, { memo, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { GetAuthorize } from "../../stores/actions/authorized.action";
import { RootStore } from "../../stores/teleSale.store";
import { ConfirmDialog } from "../UI/ConfirmDialog";
import { requireAuth, RequireAuthProps } from "../HOC/requireAuth";

const TestRedux: React.FC<RequireAuthProps> = () => {
    return <div>
    </div>
}

function mapStateToProps(state: RootStore) {
    return { auth: state.authorize.haveAuthorized }
}

const mapDispatchToProps = (dispatch: any): any => ({
    checkAuth: (token: string) => dispatch(GetAuthorize(token))
});


const Test = connect(mapStateToProps, mapDispatchToProps)(requireAuth(memo(TestRedux)))
export default Test;