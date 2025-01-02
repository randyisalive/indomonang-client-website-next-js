import { Dialog } from "primereact/dialog";
import { Rating } from "primereact/rating";
import React, { useState } from "react";

const WORowsRatingDialog = ({
  dialogStatusRating = false,
  setDialogStatusRating = () => {},
  rating = 0,
  id = 0,
  handleRating = () => {},
}) => {
  const [ratingVal, setRatingVal] = useState(rating);
  return (
    <Dialog
      visible={dialogStatusRating}
      onHide={() => setDialogStatusRating(false)}
      header="Rate Orders"
    >
      {rating == 0 ? (
        <Rating
          cancel={false}
          value={ratingVal}
          onChange={(e) => {
            handleRating(id, e.value);
            setRatingVal(e.value);
          }}
          pt={{
            onIcon: {
              className: "",
              style: { color: "#9A1C20" },
            },
          }}
        />
      ) : (
        <p>Thank you for your rating 😊 {rating}</p>
      )}
    </Dialog>
  );
};

export default WORowsRatingDialog;
