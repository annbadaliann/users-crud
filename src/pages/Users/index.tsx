import { useState, useCallback, useEffect, Fragment, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Box from "@mui/system/Box";
import { Avatar } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

import TcDialog from "../../shared/components/Dialog";
import ActionsCell from "../../shared/components/ActionsCell";
import McTable from "../../shared/components/Table";
import McButton from "../../shared/components/Button";
import ConfirmationDialog from "../../shared/components/ConfirmationDialog";

import { IUser } from "../../store/models/interfaces/user";
import { deleteUser, getUsers } from "../../store/slicers/users";

import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";

const Users = (): JSX.Element => {
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [paginationDetails, setPaginationDetails] = useState();
  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);
  const [activeRowId, setActiveRowId] = useState<number>();

  const dispatch = useDispatch<any>();

  const handleGetUsers = useCallback(async () => {
    const { meta, payload } = await dispatch(getUsers(activePage));
    if (meta.requestStatus !== "fulfilled" && !payload) {
      return;
    }

    const { data, page, per_page, total, total_pages } = payload;

    const usersWithIndexes = data.map((user: IUser, index: number) => ({
      ...user,
      index,
    }));

    setUsers(usersWithIndexes);

    setPaginationDetails({
      page,
      per_page,
      total,
      total_pages,
    });
  }, [activePage, dispatch]);

  const handleChangePage = useCallback((page) => {
    setActivePage(page);
  }, []);

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers]);

  const createDialogToggle = (flag: boolean) => {
    setCreateDialog(flag);
  };

  const edtiDialogToggle = (flag: boolean, rowId: number | null) => {
    if (rowId) {
      setActiveRowId(rowId);
    }
    setEditDialog(flag);
  };

  const deleteDialogToggle = (flag: boolean, rowId: number | null) => {
    if (rowId) {
      setActiveRowId(rowId);
    }
    setRemoveDialog(flag);
  };

  const getItemActions = useCallback(
    (rowId) => [
      {
        icon: CreateIcon,
        callback: () => edtiDialogToggle(true, rowId),
      },
      {
        icon: DeleteIcon,
        callback: () => deleteDialogToggle(true, rowId),
      },
    ],
    []
  );

  const handleDeleteUser = async () => {
    await dispatch(deleteUser(activeRowId));

    handleGetUsers();
    deleteDialogToggle(false, null);
  };

  const columnsWithLayouts = useMemo(
    () => [
      {
        title: "Avatar",
        layout: (row: IUser) => (
          <Link to={`/users/${row.id}`}>
            <Avatar
              alt={`${row.first_name} ${row.last_name}`}
              src={row.avatar}
            />
          </Link>
        ),
      },
      {
        title: "Index",
        layout: (row: IUser) => row.index,
      },
      {
        title: "Full name",
        layout: (row: IUser) => (
          <Link to={`/users/${row.id}`}>
            {row.first_name} {row.last_name}
          </Link>
        ),
      },
      {
        title: "Email",
        layout: (row: IUser) => row.email,
      },
      {
        title: "",
        layout: (row: IUser) => (
          <ActionsCell actions={getItemActions(row?.id)} row={row} />
        ),
      },
    ],
    [getItemActions]
  );

  return (
    <Fragment>
      <Box mb={4}>
        <McButton clickHandler={() => createDialogToggle(true)}>
          Create new user{" "}
        </McButton>
      </Box>
      <McTable
        rows={users}
        columns={columnsWithLayouts}
        disableCheckbox
        isSelectable
        paginationDetails={paginationDetails}
        pageChangeCallback={handleChangePage}
      />
      <TcDialog
        title="Create new user"
        open={createDialog}
        handleClose={() => createDialogToggle(false)}
      >
        <CreateUser
          getData={handleGetUsers}
          handleCloseDialog={() => createDialogToggle(false)}
        />
      </TcDialog>

      <TcDialog
        title="Edit user"
        open={editDialog}
        handleClose={() => edtiDialogToggle(false, null)}
      >
        <EditUser
          getData={handleGetUsers}
          handleCloseDialog={() => edtiDialogToggle(false, null)}
          userId={activeRowId}
        />
      </TcDialog>

      <ConfirmationDialog
        title="Delete"
        description="Are you sure you want to delete this user?"
        open={removeDialog}
        cancelAction={() => deleteDialogToggle(false, null)}
        confirmAction={handleDeleteUser}
      />
    </Fragment>
  );
};

export default Users;
