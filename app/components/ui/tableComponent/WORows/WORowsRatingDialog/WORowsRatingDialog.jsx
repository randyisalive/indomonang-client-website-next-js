import { Dialog } from "primereact/dialog";
import { Rating } from "primereact/rating";
import React, { useState } from "react";
import WebButton from "../../../WebButton";
import { useRouter, useSearchParams } from "next/navigation";

const WORowsRatingDialog = ({
  dialogStatusRating = false,
  setDialogStatusRating = () => {},
  rating = 0,
  id = 0,
  handleRating = () => {},
}) => {
  const [ratingVal, setRatingVal] = useState(rating);
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <Dialog
      visible={dialogStatusRating}
      onHide={() => {
        //setDialogStatusRating(false);
        const params = new URLSearchParams(searchParams);
        params.delete("id");
        router.replace(`${window.location.pathname}?${params.toString()}`, {
          scroll: false,
        });
      }}
      header="Rate Orders"
    >
      {rating == 0 ? (
        <div className="flex justify-center gap-3">
          <Rating
            value={ratingVal}
            onChange={(e) => {
              setRatingVal(e.value);
            }}
            pt={{
              onIcon: {
                className: "",
                style: { color: "#9A1C20" },
              },
            }}
          />
          {ratingVal > 0 && (
            <WebButton
              title="Submit"
              onClickFunction={() => handleRating(id, ratingVal)}
            />
          )}
        </div>
      ) : (
        <p>Thank you for your rating 😊</p>
      )}
    </Dialog>
  );
};

export default WORowsRatingDialog;
