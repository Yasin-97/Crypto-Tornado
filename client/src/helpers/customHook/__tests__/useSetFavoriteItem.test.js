import { act } from "@testing-library/react";
import { createStore, rendreHookWithRedux } from "helpers/testUtilities/testUtils";

import { authActions } from "store/slices/authSlice";
import {
  watchlistActions,
  addToUserWatchlist,
  removeFromUserWatchlist,
} from "store/slices/watchlistSlice";
import {useSetFavoriteItem} from "helpers/customHook";

describe("setFavoriteItem hook", () => {
  let store;

  const currentUser = {
    userId: 123,
    email: "JohnDoe@gmail.com",
    displayName: "John",
  };

  const initialValues = {
    isFav: true,
    uuid: "sdf58sdf85sfd8e1fe854sf8s4ds",
    name: "John",
  };

  beforeEach(() => {
    store = createStore();
  });
  test("isFavCrypto, isFavCryptosFetched, isUserExist should be falsy", () => {
    initialValues.isFav = false;

    store.dispatch(
      watchlistActions.setIsFavCryptosFetched({ isFavCryptosFetched: false })
    );

    const { result } = rendreHookWithRedux(useSetFavoriteItem, {
      store,
      initialValues,
    });

    expect(result.current.isFavCryptosFetched).toBeFalsy();
    expect(result.current.isUserExist).toBeFalsy();
    expect(result.current.isFavCrypto).toBe(false);
  });

  test("isFavCrypto, isFavCryptosFetched, isUserExist should be truthy", () => {
    initialValues.isFav = true;

    store.dispatch(authActions.setUser(currentUser));
    store.dispatch(
      watchlistActions.setIsFavCryptosFetched({ isFavCryptosFetched: true })
    );

    const { result } = rendreHookWithRedux(useSetFavoriteItem, {
      store,
      initialValues,
    });

    expect(result.current.isFavCryptosFetched).toBeTruthy();
    expect(result.current.isUserExist).toBeTruthy();
    expect(result.current.isFavCrypto).toBe(true);
  });

  test("run adder function", async () => {
    const { result, waitFor } = rendreHookWithRedux(useSetFavoriteItem, {
      store,
      initialValues,
    });

    act(() => {
      result.current.adder();
    });


    store.dispatch(
      addToUserWatchlist({
        userId: currentUser.userId,
        newFavCrypto: { coinId: initialValues.uuid, name: initialValues.name },
      })
    );

    await waitFor(() =>
      store.dispatch(
        addToUserWatchlist({
          userId: currentUser.userId,
          newFavCrypto: {
            coinId: initialValues.uuid,
            name: initialValues.name,
          },
        })
      )
    );

    const recievedFavCryptos = store.getState().watchlistApi.favCryptos;

    expect(recievedFavCryptos).toEqual([
      { coinId: "sdf58sdf85sfd8e1fe854sf8s4ds", name: "John" },
      { coinId: "sdf58sdf85sfd8e1fe854sf8s4ds", name: "John" },
    ]);
  });

  test("run remover function",async()=>{
    const {result,waitFor}=rendreHookWithRedux(useSetFavoriteItem,{store,initialValues})

    store.dispatch(addToUserWatchlist({
     userId: currentUser.userId,
     newFavCrypto: { coinId: initialValues.uuid, name: initialValues.name },
   }))
  act(()=>{
    result.current.remover()
  })


  await waitFor(() =>
  store.dispatch(removeFromUserWatchlist({
    userId: currentUser.userId,
    removeCryptoId: initialValues.uuid,
  }))
  )

  const recievedFavCryptos=store.getState().watchlistApi.favCryptos

  expect(recievedFavCryptos).toEqual([])

  })
});
