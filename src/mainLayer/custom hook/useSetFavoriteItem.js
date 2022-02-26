import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToUserWatchlist,
  removeFromUserWatchlist,
} from "../../store/slices/watchlistSlice";

export default function useSetFavoriteItem({isFav, uuid, name}) {
  //redux
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.authApi.currentUser);
  const { isFavCryptosFetched } = useSelector((state) => state.watchlistApi); // to handle rendering icons after favCryptos list is fetched to prevent the user from re-selecting already-selected cryptos

  const isUserExist = currentUser ? true : false;

  //states
  const [isFavCrypto, setIsFavCrypto] = useState(isFav);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  //side effects
  useEffect(() => {
    setIsFavCrypto(isFav); // as isFav comming from server, we need to reset it as soon as it updates
  }, [isFav]);

  //functions
  const adder = async () => {
    try {
      setIsLoading(true);
      await dispatch(
        addToUserWatchlist({
          userId: currentUser.userId,
          newFavCrypto: { coinId: uuid, name: name },
        })
      );
      setIsLoading(false);
      setIsFavCrypto(true);
    } catch (err) {
      setIsError(`failed to add ${name} to favorite cryptos!`);
    }
  };

  const remover = async () => {
    try {
      setIsLoading(true);
      await dispatch(
        removeFromUserWatchlist({
          userId: currentUser.userId,
          removeCryptoId: uuid,
        })
      );
      setIsLoading(false);
      setIsFavCrypto(false);
    } catch (err) {
      setIsError(`failed to remove ${name} from favorite cryptos!`);
    }
  };

  return {
    isLoading,
    isFavCrypto,
    isError,
    isUserExist,
    isFavCryptosFetched,
    adder,
    remover,
  };
}
