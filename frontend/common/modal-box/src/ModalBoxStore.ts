import { ModalBoxPayload, actionOpenModal, actionCloseModal } from './decorators';

export class ModalBoxStore {
  @actionOpenModal
  open = <P = any>(component: ModalBoxPayload<P>['component'], props: P) => ({
    component,
    props,
  });

  @actionCloseModal
  close = <P = any>(component: ModalBoxPayload<P>['component'], props?: P) => ({
    component,
    props,
  });
}
