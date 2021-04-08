import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";

const DATA = [
  {
    name: "Mai",
    value: "aaaa",
  },
  {
    name: "Nanami",
    value: "bbb",
  },
  {
    name: "Sayuri",
    value: "ccc",
  },
];

const TBody = styled.tbody`
  border: 0;
`;

const Row = styled.tr<{ isDragging: boolean }>`
  ${(props) =>
    props.isDragging ? `background-color: blue; display: table` : ""}
`;

const Cell = styled.td`
  box-sizing: border-box;
  padding: 6px;
  /* locking the width of the cells */
  width: 50%;
`;

const Table = styled.table`
  border: 1px solid #000;
  table-layout: fixed;
  width: 500px;
  margin: 0 auto;
`;

type Props = {
  data: { name: string; value: string };
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
};

const TableRow: React.VFC<Props> = ({ snapshot, data, provided }) => {
  return (
    <Row
      ref={provided.innerRef}
      isDragging={snapshot.isDragging}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Cell>{data.name}</Cell>
      <Cell>{data.value}</Cell>
    </Row>
  );
};

const Component = () => {
  const onDragEnd = (result: DropResult) => {
    // TODO
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Body</th>
            </tr>
          </thead>
          <Droppable droppableId="table">
            {(droppableProvided) => (
              <TBody
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                {DATA.map((d, i) => (
                  <Draggable draggableId={d.name} index={i} key={d.name}>
                    {(draggableProvided, snapshot) => (
                      <TableRow
                        snapshot={snapshot}
                        data={d}
                        provided={draggableProvided}
                      />
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </TBody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </>
  );
};

export const DraggableTable = Component;
