import React from "react";
import { useSelector } from "react-redux";
import { Loading, ErrorMessage, Avatar } from "components";
import { useGetCryptosQuery } from "store/apis/cryptoApi";
import { Routes } from "router";
import useVoiceAI from "../../helpers/customHook/useVoiceAI";

export default function MainSection({ userResolved }) {
  //api call
  const {
    data: cryptosList,
    isFetching: isCryptosListFetching,
    refetch: refetchCryptosList,
  } = useGetCryptosQuery(10);

  //redux
  const currentUser = useSelector((state) => state.authApi.currentUser);

    //call voice-ai
  useVoiceAI();

  return (
    <div className="main-section">
      {isCryptosListFetching && <Loading />}
      {!cryptosList?.data && !isCryptosListFetching && (
        <ErrorMessage refetchAction={refetchCryptosList}>
          You may have bad internet connection! try to refetch.
        </ErrorMessage>
      )}
      {currentUser && <Avatar />}
      {userResolved && (
        <div className="routes">
          <Routes />
        </div>
      )}
    </div>
  );
}
