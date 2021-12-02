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
import LoadingWrapper from "../../shared/containers/LoadingWrapper";

import { deleteUser, getUsers } from "../../store/slicers/users";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import { AppDispatch } from "../../store";
import { IUser } from "../../store/models/interfaces/user";

const Users = (): JSX.Element => {
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [paginationDetails, setPaginationDetails] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);
  const [activeRowId, setActiveRowId] = useState<number | undefined>();

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

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const openEditDialog = (rowId) => {
    setActiveRowId(rowId);
    setEditDialog(true);
  };

  const closeEditDialog = () => {
    setEditDialog(false);
  };

  const openRemoveDialog = (rowId) => {
    setActiveRowId(rowId);
    setRemoveDialog(true);
  };

  const closeRemoveDialog = () => {
    setRemoveDialog(false);
  };

  const getItemActions = useCallback(
    (rowId) => [
      {
        icon: CreateIcon,
        callback: () => openEditDialog(rowId),
      },
      {
        icon: DeleteIcon,
        callback: () => openRemoveDialog(rowId),
      },
    ],
    []
  );

  const handleDeleteUser = async () => {
    await dispatch(deleteUser(activeRowId));

    handleGetUsers();
    closeRemoveDialog();
  };

  const columnsWithLayouts = useMemo(
    () => [
      {
        title: "Avatar",
        layout: (row) => (
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
        layout: (row) => row.index,
      },
      {
        title: "Full name",
        layout: (row) => (
          <Link to={`/users/${row.id}`}>
            {row.first_name} {row.last_name}
          </Link>
        ),
      },
      {
        title: "Email",
        layout: (row) => row.email,
      },
      {
        title: "",
        layout: (row: any) => (
          <ActionsCell actions={getItemActions(row?.id)} row={row} />
        ),
      },
    ],
    [getItemActions]
  );

  return (
    <Fragment>
      <LoadingWrapper isLoading={!users.length}>
        <Box mb={4}>
          <McButton onClick={handleOpenDialog}>Create new user </McButton>
        </Box>
        <McTable
          rows={users}
          columns={columnsWithLayouts}
          disableCheckbox
          isSelectable
          paginationDetails={paginationDetails}
          pageChangeCallback={handleChangePage}
        />
      </LoadingWrapper>
      <TcDialog
        title="Create new user"
        open={isDialogOpen}
        handleClose={handleCloseDialog}
      >
        <CreateUser
          getData={handleGetUsers}
          handleCloseDialog={handleCloseDialog}
        />
      </TcDialog>

      <TcDialog
        title="Edit user"
        open={editDialog}
        handleClose={closeEditDialog}
      >
        <EditUser
          getData={handleGetUsers}
          handleCloseDialog={closeEditDialog}
          userId={activeRowId}
        />
      </TcDialog>

      <ConfirmationDialog
        open={removeDialog}
        cancelAction={closeRemoveDialog}
        confirmAction={handleDeleteUser}
      />
    </Fragment>
  );
};

export default Users;
