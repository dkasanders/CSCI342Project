import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import CartItem from './CartItem';
import { useState } from "react";
function Cart() {

    const dummyData = [
        {
            'name': 'ONE',
            'price': 0,
            'quantity': 1,
            //images should be a list containing buffers and strings that are used to pull the image online. for the sake of simplicity i'm hardcoding one image
            'images': ['data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEBYUExAXFxYYFhkaGRYZFhAWFhYYGBkaGBYWFhYZHikhGRsmHBYWIjIiJiovLy8vGCA1OjUuOSkuLywBCgoKDg0OHBAQHC4eICYsMS4uLi4uLi4uLi4uLiwuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLv/AABEIARMAtwMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcDBQgEAgH/xABREAABAwIBBgYMCA4ABgMAAAABAAIDBBEGBQcSIVHBMWGRobLREyIkQVJjcXJzgaKxFCMyQmJ0ksIVJTM0NVRkgpOjs8PS4UNTg7Tw8RZERf/EABoBAQADAQEBAAAAAAAAAAAAAAADBAUCAQb/xAA6EQACAQIBCQQIBQQDAAAAAAAAAQIDBBEFITEzYXGBscESMkHRExUjNFGRofAUIkJy4SRSgsJDRGL/2gAMAwEAAhEDEQA/ALxREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBYamoZGwve4Na0XLibABZlGMfvtR27zntB9V3fdUVap6OnKfwWJJSh25qHxZkqca5PYLuqOSOZxPkAbcr3DEVF+uQ/xY+tVNLGwlva3+UbcHyQ0avtrxTUzTwNt677llwynNwUnFZzU9XU9GL+/kXQMv0f63D/Fj60/D9H+tw/xY+tUo2ji+cCfWvmVrALNjAXnrbwUcT31ZD+5/Iu3/wCQUf63D/EZ1r4diWhHDWQfxY+tUM7shPAANtgsrKRnCRcrv1nhpj9f4HquH9z+ReIxPQ96riPke0+5fjsU0I/+1Hyk+4KmG6I4GrHJOuPWs280F8/4PfVcP7mXBNjaiabB7ncbY3keomy9WHcSU9Z2TsOlaNwa4ubo6yL6tarKJ4u0aItcD1XW+zIu0qepf4U/3AfvKxZ3VWtJqSSWwrXNpTp0+1HHHMWUiItIzgiIgCIiAIiIAiIgCIiAKJZxHfERjbLfkY7rUtUKzkO7WEbS88gaN6p5Q92nuLNnr47ys8S5SkgfTiMNu8vabgnU50Y1WI16lN8S4WZTxte2Zzi5+jZwZa2i431AeCq/xA3SraNu2RvPKwblcGcA/Exjxv3Hdaz6NKDsu00scDUrzlGvCKeZ6fmQLDmSfhVa+Av0Gtg7JpBoJ0tPRA1m1rXWDEWTRBUyRB+kG6PbFmvW0O7x41Is3jfxlUHZTR88jupeLGcd62c+bzRtUVenCFpCaWdvT8zqnVk7mUG8yWPI8ORMPibJJr3ylrgyZ/Yw0aPxTntAve+vQHKtFSsMk8EQNhLOyMnRN2h17uGvWdSsDDkdsMgbYJfaked6heRILZRoh+0A8jXFWa1GlGvTgks5zSrTcKjb0N4bMEbPFOH20srY2yF4LNIlzRfhI7x4ljwjhllXFVSyyFvYJXNbohusNja+7r319st9nIPdbfQt6b0zcm2TsoO/aJ+aCILijTh+KqQwzJEdStUVtCaed+PzI67U0nYCeQEqS5jI7UEp21LuaKL/AGorlB1oZHbInnkYVM8yrbZMv4U8p9w3LvJizs9v9VxXUn6Ii2DFCIiAIiIAiIgCIiAIiIAoDnNk7aAcTzylnUp8q3znG88Q2Rk8rj/iqOUvdpcOaLlgsa648ivq06WVaFvjIOef/StzOA74uL0h6J61U1I3Sy3RjZJCeRxerTziO7WEcbzyBvWq0fy2L3LoX6/vNPd5mrzba6+qOyGAcrpTuWtxe+1VUEnbzMA3LZZrh3VWn6NOOaU71psYi89SdhfzBQ3S/pKS2+Yp+9y3LoSLJ3a4bj+rt9pw61DcOy6eVKEW/wCLIeSF6mTu1w3F9Xp+d0fWobhFt8sUfF2Y/wAojerVfPd01s8yKhqar38iSZwvzzyQsHtPKYEFsj1h8KoqPut3LBnDkPwxwHgM3nevvBj7ZBld4U8vPMGqKj7xXlsE/d6S2rqRnLzrU0vo384tvU+zNstkiI7Xyn+Y4blXOJn9zScbQOV7VZ+aeLRyRT8YeeWV53rvJvidX+qW/wAyXoiLVMcIiIAiIgCIiAIiIAiIgCq7Oc/usDZCznfIrRVS5xXXryNjGDmJ3qhlJ+w4ovZOWNbgyKYbOliCnGx7eaIuVnZxz+QHpP7arLBAviGHzn+zTv6lYuc1/bQD6MnOWdSr1s1i/wDHnEu1c95BbOjMWagfGVp+nCOSMneo3i6S8tXxGb73UpLmiGqsPj2Dkib1qJ4uHbVZ+lN73KG7zW1FbVyFHPd1CYZRdo4cg+rUn9oqJYGscsU9uARzn2Lb1L8SM0cgwt8VTjkDOpRPNyz8bRcVPMedg3q3VX9bDd5kFHNaT3voe3ODKPh7xsDB7AO9ZcLm2G2nwpX/APcO6l4cfn8YTHzP6TF68iHRw1TA/Okdzyyu3KvDTXe/qTTXs6K2rkRXEp7ldxlvSB3K383DLZKpR4oHlJO9U3it/cw88e4ncrrwK22TKQfs8XOwFT5N7rI8o9yO/ob5ERaZkhERAEREAREQBERAEREAVOY7kvlCbi0ByRtVxqkcYyB2UJ/OI5AG7lm5U1SW3ozSyYvat7OqNZm0bp5fa7wTOfZezep3nPf8dEPFu53DqUHzPC+WXHYyY+0BvUzzmnumMbIfe93UuLrNZvhzRZk8b5bI9D15oB8VVH9pI5Io1A8VyEipPHL0irAzQMtS1B21cnMyMblXOJzaKc7S/nco7peyoraugt/eKu/qWTjbtckwjjhHIw9SiubaxyuOKlkP8yMKV5xRbJ8I+nGOSN6i2a4XytIdlGeeZnUp5576P7fMr081nPj0NZnAlca+o18DhzMat1BZuHqAbXX5pTvC0GOj3ZVH6buZtty3NebZFyY3bHpewP8AJQxf5az29SzNamP3mRDsWy/ENAHz/c13Wr7wuy1DTDZTxdBq58xYbRsHG48gHWujMjs0aeJuyJg5GgKxk9fkK+Ue7Fb+h7URFoGWEREAREQBERAEREAREQBUNiJ+lXVB8c8e2RuV8rn3Kj7zTO2yPd7RKzcp9yK2mpktfmk9nUy5jRfKjz+zyHlki61Ls5p7sZ6FvTkUUzCt/GMp2UzhyyRdSk+cp/do4omdJ65vfdXvXMm/7z3dDd5ox3FKdtVMeiNyq7Ez7wynbvcFaWab9Gk7Z5z7ZG5VXlftoreE+Mcr2qO50UV9/pFtrqr2+Zamc/VSxDxo5o3qNZqW/jOY7KVo5ZL7lI86TwIYh9N3M3/a0GaLXXVZ2QxDlc87lM1jff49CvDNZP78URbHL+6Ks/Tm5i4blIsrs/FmSxspQT62Rf7UYxs/46sO2SbpvUtxBcUtCwHgo4udrf8AFVsfZVf3f7FuXfpbnyK9xaO1j/f59FdK0zbMaNjR7lzdiLW+Nu3e625dLWVyw7hVyi80OPQ/URFfMwIiIAiIgCIiAIiIAiLDJUMbwvaPKQEBlK51ylICx7uJx5ir9mypAAfjB6rn3LnzKUbixzQO8d6y8optw3voa2S8zljs6m7zBfn0/oP7jFuM5cvd7hsYz3E71qMycZhrJnyjRaYdEHh16bTbVxArLnIqNOve5oJbossbHwBvuurpdq3w2ktNY3rezoTfNc62Rmu45z/Mk6lU8kukYm7ZoR7bVaWb+VsWQ2Ne4NeI5yWkgG5fIRzEKq6caU1OLH84hvqOodkbclLlJzpffwPLbTWe1/7Fn53ZAGU4+lIeQN61q8zGuqrjsZTjl7Kdyz55JhemAI4JTwjxawZj2/G1ztppxyNk/wAl3FY3bewgeawx+9LIJjCbtqjjkl53uU7xNqNK3waSEe9Vliee/Zjfhc88rlYmOnltUxo70EQ5iqclhby2yRdqRwrQX/nyRDMsnSrIG+jHLIulFzNUm9dT+kh6YXTKu2GqxKWUtMNzCIivGYEREAREQBRXKeOqGGd8L5QJGEBwdpNAJAOp1rHUQpUqdzrZJi+Gse0BrnxXeQB27g4tueOwAUNer6KHbLVnShVqdieOjwJmMYxP+RPB9tpPOV9fhaR/BMD5pbuVFZXdLA6NrAx2npcIPetx8axxZZmbwwD1EhVFd1HHtKKeO3A0PwFLHM38kXq9zzwucfKSV8aCpVuJpANUL2naHnqC9sGNHNABMw8jz/kvfxk/Gm+DTOXYLwn9GW1INSguUKSzitQzG/jpvX228r4fiaJ/DM6/Gxw9wUVa47a7klwJaNq4PvL6+RJsLRaLz5Fly/DpSX4go1R4mZGbtnZ+80rNLidj9Zlh5Q33leO5h6PstP5HX4afpO0mvmTHJOqn0eI71G4qUCVp1anD3r9psUFrLARuG3sm3ycK0mUcTvYbtEd9hN+YEFduvTqdlLw2HkLWonLRn2omeK4w9rLjgvz2TB94xJbv24NXACq3yhjWrlFjJG0fRYD79IrS1OV5Xgh80jgfm3IbyXtzKf8A5O2ceg9n6OTXMl2WI6VkrtMs4Tcand/YLkrFijFjZZjJGHEaDW6T9Q7UW1C97cihQlPeAHHwnqX665Gs3UbpRwcXoxxLMYrFS0tIkGTKwy1NM93D2WEH1SBdTLk/Df5em9NF/UC6wU9tFRTS+Jm5S0x3BERWTNCIiAIiIAquzrN7pgPij0laKrDOuO6Kc+Ld0gqd/qGXcn69bnyK2xEy8sH7/wB1frYCvnFUxZ2FzQLgv4eD5qsbCuB4qqhgndM9r3sDiAGFoNyNQIvbVtWZRo1KtKPZ282bFWvCksZeJXzIQe8jqRp+arNdmvt8mr5Yup68kubOo+bURHyiRvuuvXaXC/T9URK9oP8AVz8iuTQs8FfP4Pj2DkCnsubmuHB2N3kkdvaFFatoilfFJqcxxa4cIBGo6++o5QrQX5k0SwrU591pmp/BkexBkqM973ra0D2zv0IT2R5B7Rl3OIGskNGvUvdJkidvyoJB5Y5B72p2qu06co6Mx7cn0sbYo+0b8lveHgqM4ko2PqHkjgaOipPFLZrRsA5go/le7qhwAJJaAANZJLbAAd8qOnN45mcpZyA9jX6Gqd5JzVZUmsXRNibq1yvANvMbd1+IgKa5HzKU7bGoqnvPgxhsbfISdIn1WW6oSZWnc0IeOO7OUiFkdG61rG5Fxxg8BHEuoMj4JybTWMVHHpDge4GR99oc+5HqVV5347ZUvbhgi97xuXNSLhHtHlK8VWfZSIXkVmhPTA/82L+oF1WuVqU90wcT4+Z4XVK9tXjFsr5S0x3BERWjMCIiAIiIAq0zr/loPMk6TVZarTO4PjabjbKOePrVS+1EuHMuWGvXHkVfilt2x+V25Xvm5/RVJ6Fu9UfiVuqP97crzwA22TKX0DPcq+THjT+/iy7lPux39CQoiLTMYLnzHcWjlSpFtXZA77TGu3roNUZnQi0cpyHwmxu9gN+6qd7q+Jeye8Kj3dUaDNK7Ry3ANpmH8qQ+8BdJLmzN52uWqc+OePtMeN66TU1vLGIygvaLd5lLZXPdEw8dL03LR/8A6EXnxdJq3mXh3VUemk6blomm9fF58XSavn46573zNZdzh0OhkRF9Mz5sKk89DbZQiO2nbzSSdauxU/nsi7ppnbYnj7LgfvKvdaplqy1y48itWC0rDse08jl1UuVpm6wdnXddUXUdm8YstZS0Q49D9REVwywiIgCIiAKtc7rCZKX/AK3visrKVc52xrpj6X+31Kre6iX34luw18ePJlY5fB+Lv9L7qvXAn6MpPq8fRConELu1j9f3Ve+Bf0ZSegj6IVXJnc+/iy7lPux3m+REWoY4VN53Ye72HbC08j5BuCuRVTnijtUU79sbx9lwP31VvF7FluxftlufIgeEho5Vpj4+MfaIbvXSS5syQ/Rr6d3j4f6jV0mubJ4wJco99bupTGIHWrJx41/SJWhjb3dH6SP3tW7xK3u+f0jufXvWlh/PIvPj6QWIs1xLe+ZqrVLd0OhERF9OfNBVTntj7alPpRzxHerWVaZ6YrxU7tj5B9prT91QXWqZZs9dHjyZU0w7U8V11BD8keQe5czwMu13/neXS1Ifi2eaPcq1i+8t3Ut5S/Rx6GZERaBlhERAEREAVeZ229rTn6UnuZ1Kw1X+dr8nB57+iOpVrzUSLdjr4/fgypcSGwjJPhblfmBf0ZSfV4ugFSlTodki7Jo6PbfKta9hbhW9hr3xgaMhaLarHVbvW4lk217ChFKSb3b2a15buskky7EVSMxHWMAImcRxkke9Z2Y2rG8Lmn91vUr0cqW70trh5YmY8nVvDBlqKtc8sN2079jpG/aDD91fsGcWb50LD5NLrWrxfiD4dExnY+xlj9LS0i6/akWtYW4QeHvL2vd0KlNxUlid0LWtTqqTjm/ggUDtGeJ2ySM8jwV00ucpckvJBa5mo7SNyu+DFdE4D44A8bXjntZLGSSab+qO8oRcuy0sdJWmLdWUJ/Se9rVo6W/wuLz4ukFu8VSsfXTPY4Oa5zSCNYPaN33Wmox3TF58fTCyn7xLe+ZoR1K/b0Og0RF9Kz5sKvs8sd6SI7Jrcsb+pWCoTnaZegB2TMPsvG9QXOqluJ7V+2jvKgpG6iOJdF5MN4YztYzohc8UTdZ8i6DyKb00J8VH0QqmT9MuBdyl+nie5ERaRlhERAEREAUAzvfkYPSu6BU/VfZ5PzaH01uWN/Uq90vYy3Fqy18d5VWXReNnr3K9sExg5MpAQCPg8WogH5gVCZRPaMHlV/YJ/RtJ9Xi6AVTJuaLX3pL+Ve7E9k2RqV/yqeI/uMvygLwT4OoXf8HR818g5r2UgRX5Uacu9FPgZMas46JNcSHS5vaU/Jklb62OHO1RvFWEvglO6cTF4a5oLSwNPbODb3vxjvK1Vrcu5KZVU74JC4NfbW22kNEhwIuCOEBV6ljRlF4RWPyLNK9qxku1JteOhlF/hBgFyDzKQjDFdZrxTOLXAOBDojcEXGoOvzLenNPCXC9VJoX1t0Iw88QfwD7KsGmgDGNY3ga0NF9ZsBYX5FSpZLi8fSZtzLlbKWGHo8/xxTKLq4HxyObIwtcOFpBBGoHgPlWDJ+uoj89nTCkWcLVlCXjDD/LaNyjWTHd0x+fH0gqcafYrOK8Hh9cC72nOipfFY/Q6EX6iL6U+aCimcxl8nP4nxn2gN6lajuPo9LJ8w8w8j2lQ3GqluZLQeFWO9FMUre2PkV8ZAN6SD0MfQComE2ePIVeWGDeig9CzohZ+TXpL+UtETaoiLWMsIiIAiIgCgOeJt6SH04/pyKfKEZ14HPomaLS7RnaTYE2Gg8XNu9rChuNVLcWbN4V4bym8pjUz17l0Bgz9HUn1eHoNVAV0bpHMYxrnOJNmNBc4+Ro1roLCsDmUNMx7S1zYImuaeFrgwAg8d1Sycng396TRyq/yx3m4REWmYoREQBERAVHnEaPwg7jYz3W3KK5LHdLPPj6YClmcsWr7+LjPO4blFMmjupnns6YXz9T3mW8+io+7L9p0KiIvoD50LwZZoRPA+Iu0dMWva9u/e3f4F70XjSawZ6ng8UVnJmyk0wW1bbccbr2+1rVg5NpBFDHECSGMa0E8J0Ra5XrRRUqFOl3FgS1a86mCk+XQIiKYhCIiAIiIAiIgPjsYvewvtsL8q+0RAEREAREQBERAVXnQFqxp2wt5nPUSoWj4XHxvj/qf+ldGWsOU1UQ6aMlwFgQ57SBe9u1Ota7J2A6GKUSiNz3Agt03lzWlvAQ3gvcDWbrLqWU5V3NNYN+Rq076nGioNPFLAlSIi1DKCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiA//9k=']
        },
        {
            'name': 'TWO',
            'price': 0,
            'quantity': 1,
            //images should be a list containing buffers and strings that are used to pull the image online. for the sake of simplicity i'm hardcoding one image
            'images': ['data:image/jpeg;base64,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']
        },
        {
            'name': 'THREE',
            'price': 0,
            'quantity': 1,
            //images should be a list containing buffers and strings that are used to pull the image online. for the sake of simplicity i'm hardcoding one image
            'images': ['data:image/jpeg;base64,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']
        }
    ]
    


    const getuserCart = (user_id) => {
        //api pull... 
        //updateuserCart
        fetch("http://www.localhost:3000/api/cart")
    }

    const [userCart, updateuserCart] = useState(dummyData)
    return (
        <>
            <p>Your Cart:</p>
            {userCart.map((item, index) => {
                return <CartItem key={index} result={item} />
            })}

        </>
    )
}

export default Cart;