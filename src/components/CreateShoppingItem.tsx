import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState } from "react";
import { CButton } from "~/mui-c/Button";
import CTextField from "~/mui-c/TextField";
import { useStore } from "~/zustand";
import { Controller, useForm } from "react-hook-form";
import { getValidation } from "~/utils/client/form-validation";
import cfetch from "~/lib/cfetch";
import useTimeout from "~/hooks/useTimeout";

interface CreateShoppingItemProps {}

const CreateShoppingItem: React.FC<CreateShoppingItemProps> = ({}) => {
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const itemCategories = useStore((state) => state.itemCategories);
  const dispatchDrawer = useStore((state) => state.dispatchDrawer);
  const dispatchItem = useStore((state) => state.dispatchItem);
  const [status, setStatus] = useState("");

  useTimeout(
    () => {
      setStatus("");
    },
    status ? 5000 : null
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      image: undefined,
      note: undefined,
      category: null,
    },
  });
  const onSubmit = async (data: any) => {
    try {
      setFormError("");
      setLoading(true);
      setStatus("");
      const result = await cfetch("/api/items", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setLoading(false);
      if (result.error) {
        setFormError(result.error);
        return;
      }
      dispatchItem({ type: "item:add", payload: result.data });
      reset();
      setStatus("Item created!");
    } catch (err) {
      setLoading(false);
      setFormError("something went wrong!");
      console.error(err);
    }
  };
  return (
    <div className="wrapper">
      <h2>Add a new item</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form__fields">
          <div className="row">
            <label htmlFor="name">Name</label>
            <Controller
              name="name"
              control={control}
              rules={getValidation({ name: "name" })}
              render={({ field }) => (
                <CTextField
                  id="name"
                  placeholder="Enter a name"
                  fullWidth
                  required
                  autoComplete="off"
                  error={"name" in errors}
                  helperText={errors.name ? errors["name"].message : ""}
                  {...field}
                />
              )}
            />
          </div>

          <div className="row">
            <label htmlFor="note">Note (optional)</label>

            <Controller
              name="note"
              control={control}
              rules={getValidation({ name: "note", req: false, min: 3 })}
              render={({ field }) => (
                <CTextField
                  id="note"
                  multiline
                  placeholder="Enter a note"
                  fullWidth
                  minRows={5}
                  maxRows={10}
                  autoComplete="off"
                  {...field}
                  error={"note" in errors}
                  helperText={errors.note ? errors["note"].message : ""}
                />
              )}
            />
          </div>

          <div className="row">
            <label htmlFor="image">Image (optional)</label>

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <CTextField
                  id="image"
                  type="url"
                  autoComplete="off"
                  placeholder="Enter a url"
                  fullWidth
                  {...field}
                />
              )}
            />
          </div>

          <div className="row">
            <label htmlFor="category">Category</label>

            <Controller
              name="category"
              control={control}
              rules={getValidation({ name: "category" })}
              render={({ field }) => (
                <Autocomplete
                  sx={{ fontSize: "1.5rem" }}
                  disablePortal
                  id="category"
                  options={itemCategories}
                  fullWidth
                  ListboxProps={{
                    style: {
                      fontSize: "1.5rem",
                    },
                  }}
                  {...field}
                  renderInput={(params) => (
                    <CTextField
                      {...params}
                      fullWidth
                      error={"category" in errors}
                      helperText={
                        errors.category ? errors["category"].message : ""
                      }
                    />
                  )}
                  onChange={(_, data) => field.onChange(data)}
                />
              )}
            />
          </div>
        </div>

        <div className="form__footer">
          {formError && <p className="error">{formError}</p>}
          {status && <p className="status">{status}</p>}
          <div className="form__cta">
            <Button
              variant="text"
              sx={{
                color: "var(--clr-black)",
                textTransform: "none",
                fontSize: "1.5rem",
              }}
              disabled={loading}
              onClick={() =>
                dispatchDrawer({ type: "drawer:set", payload: "create-list" })
              }
            >
              Cancel
            </Button>
            <CButton
              data-cy="save-shopping-item"
              type="submit"
              variant="contained"
              sx={{
                padding: "1rem 1.5rem",
                fontSize: "1.5rem",
              }}
              disabled={loading}
            >
              {loading ? "loading..." : "Save"}
            </CButton>
          </div>
        </div>
      </form>
      <style jsx>{`
        h2 {
          font-size: 2.4em;
          margin-bottom: 2em;
        }
        .wrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          padding: 4rem;
          overflow-y: scroll;
          font-size: 1rem;
        }
        form {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .form__cta {
          margin: 3em 0;
          display: flex;
          justify-content: center;
          gap: 1.5em;
        }
        .form__footer {
          text-align: center;
        }
        .row + .row {
          margin-top: 2em;
        }
        .row label {
          display: block;
          font-size: 1.4em;
          font-weight: 500;
          line-height: 1.7em;
          margin-bottom: 1em;
        }
        @media (max-width: 768px) {
          .wrapper {
            padding: 1.5rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateShoppingItem;
