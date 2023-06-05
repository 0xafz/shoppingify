import { useRouter } from "next/router";
import { useState } from "react";
import cfetch from "~/lib/cfetch";
import { CButton } from "~/mui-c/Button";
import CTextField from "~/mui-c/TextField";
import { unGroup } from "~/utils/client";
import { useStore } from "~/zustand";

const SaveListNameForm = () => {
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [listName, setListName] = useState("");
  const router = useRouter();
  const dispatchList = useStore((state) => state.dispatchList);
  const currListItems = useStore((state) => state.currListItems);

  const handleSave = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      setLoading(true);
      setFormError("");
      const result = await cfetch("api/lists", {
        method: "POST",
        body: JSON.stringify({
          name: listName,
          status: "incomplete",
          items: unGroup(currListItems),
        }),
      });
      setLoading(false);
      if (result.error) {
        setFormError(result.error);
        return;
      }
      if (result.data) {
        dispatchList({
          type: "list:save",
          payload: result.data,
        });
        router.push("/history");
      }
    } catch (err) {
      setLoading(false);
      setFormError("something went wrong!");
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSave} data-cy="SaveListNameForm">
      <CTextField
        data-cy="input"
        placeholder="Enter a name"
        fullWidth
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        required
        autoComplete="off"
        InputProps={{
          endAdornment: (
            <CButton
              type="submit"
              disabled={loading}
              variant="contained"
              data-cy="save"
            >
              {loading ? "..." : "Save"}
            </CButton>
          ),
        }}
        error={!!formError}
        helperText={formError}
      />
      <style jsx>{`
        form {
          width: 100%;
        }
      `}</style>
    </form>
  );
};

export default SaveListNameForm;
