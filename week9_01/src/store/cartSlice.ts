import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "../types/domain";
import cartItems from "../constants/cartItem";

export interface CartState {
    items: CartItem[], //id, titile, singer, price, img, amount
    amount: number, // 담은 수량
    total: number, // 금액
}

const initialState: CartState = {
    items: cartItems,
    amount: 0,
    total: 0,
}

const recalculateTotals = (state: CartState) => {
    state.amount = state.items.reduce((sum, item) => sum + item.amount, 0);
    state.total = state.items.reduce(
        (sum, item) => sum + Number(item.price) * item.amount,
        0
    );
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // 수량 증가
        increase: (state, action: PayloadAction<string>) => {
            const targetId = action.payload;
            const targetItem = state.items.find((item) => item.id === targetId);

            if (!targetItem) return;

            targetItem.amount += 1;
            recalculateTotals(state);
        },

        // 수량 감소
        decrease: (state, action: PayloadAction<string>) => {
            const targetId = action.payload;
            const targetItem = state.items.find((item) => item.id === targetId);

            if (!targetItem) return;

            targetItem.amount -= 1;
            recalculateTotals(state);
        },

        // 아이템 제거
        removeItem: (state, action: PayloadAction<string>) => {
            const targetId = action.payload;
            const targetItem = state.items.find((item) => item.id === targetId);

            if (!targetItem) return;

            state.items = state.items.filter((item) => item.id !== targetId);
            recalculateTotals(state);
        },

        // 전체 삭제
        clearCart: (state) => {
            state.items = [];
            recalculateTotals(state);
        },

        // 전체 합계 계산
        calculateTotals: (state) => {
            recalculateTotals(state);
        },
    }
})

export const { increase, decrease, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;