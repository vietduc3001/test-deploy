import React from 'react';
import PropTypes from 'prop-types';
import AddNewTask from '../AddNewTask';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppsSideBarFolderItem from '@crema/components/AppsSideBarFolderItem';
import LabelItem from './LabelItem';
import AppList from '@crema/components/AppList';
import ListEmptyResult from '@crema/components/AppList/ListEmptyResult';
import SidebarPlaceholder from '@crema/components/SidebarListSkeleton';
import { Button } from 'antd';
import {
  StyledPlusOutlined,
  StyledTodoScrollbar,
  StyledTodoSidebarContent,
  StyledTodoSidebarHeader,
  StyledTodoSidebarList,
  StyledTodoSidebarTitle,
} from './index.styled';
import { useGetDataApi } from '@crema/hooks/APIHooks';

const TaskSideBar = ({ reCallAPI }) => {
  const [{ apiData: labelList }] = useGetDataApi('/api/todo/labels/list', []);
  const [{ apiData: folderList }] = useGetDataApi('/api/todo/folders/list', []);

  const [isAddTaskOpen, setAddTaskOpen] = React.useState(false);

  const onOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };

  return (
    <>
      <StyledTodoSidebarHeader>
        <Button
          ghost
          type='primary'
          icon={<StyledPlusOutlined style={{ marginRight: 8 }} />}
          onClick={onOpenAddTask}
        >
          <IntlMessages id='todo.addNewTask' />
        </Button>
      </StyledTodoSidebarHeader>

      <StyledTodoScrollbar>
        <StyledTodoSidebarContent>
          <StyledTodoSidebarList itemLayout='horizontal'>
            <AppList
              data={folderList}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={true}
                  placeholder={<SidebarPlaceholder />}
                />
              }
              renderItem={(item) => (
                <AppsSideBarFolderItem
                  key={item.id}
                  item={item}
                  path={`/apps/todo/folder/${item.alias}`}
                />
              )}
            />
          </StyledTodoSidebarList>

          <StyledTodoSidebarTitle>Labels</StyledTodoSidebarTitle>

          <StyledTodoSidebarList aria-label='main mailbox folders'>
            <AppList
              data={labelList}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={true}
                  placeholder={<SidebarPlaceholder />}
                />
              }
              renderItem={(label) => <LabelItem key={label.id} label={label} />}
            />
          </StyledTodoSidebarList>
        </StyledTodoSidebarContent>
      </StyledTodoScrollbar>

      {isAddTaskOpen ? (
        <AddNewTask
          isAddTaskOpen={isAddTaskOpen}
          onCloseAddTask={onCloseAddTask}
          reCallAPI={reCallAPI}
        />
      ) : null}
    </>
  );
};

export default TaskSideBar;

TaskSideBar.propTypes = {
  reCallAPI: PropTypes.func,
};
