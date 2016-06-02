import * as $ from 'teaspoon';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS} from './constants';
import {TodoFooter} from './footer';

describe('Footer', () => {

  describe('structure', () => {
    const getFixture = (overrides = {}) => {
      const defaultProps = {
        completedCount: 0,
        count: 0,
        nowShowing: ALL_TODOS,
        onClearCompleted: () => { }
      };
      const props = Object.assign({}, defaultProps, overrides);
      return <TodoFooter {...props}/>;
    };
    it('should render a footer with class of "footer"', () => {
      $(getFixture())
        .render()
        .find($.s`${TodoFooter} footer`)
        .tap(collection => {
          expect(collection.length).toBe(1);
          expect(collection.unwrap().classList).toContain('footer');
        })
        .unmount();
    });
    describe('todo count', () => {
      it('should render "0 items" for zero item count', () => {
        $(getFixture({ count: 0 }))
          .render()
          .find($.s`${TodoFooter} .todo-count`)
          .tap(collection => {
            expect(collection.text()).toEqual('0 items left');
          })
          .unmount();
      });
      it('should render "1 item" for single item count', () => {
        $(getFixture({ count: 1 }))
          .render()
          .find($.s`${TodoFooter} .todo-count`)
          .tap(collection => {
            expect(collection.text()).toEqual('1 item left');
          })
          .unmount();
      });
      it('should render "items" for items greater than one', () => {
        $(getFixture({ count: 5 }))
          .render()
          .find($.s`${TodoFooter} .todo-count`)
          .tap(collection => {
            expect(collection.text()).toEqual('5 items left');
          })
          .unmount();
      });
    });
    describe('filter links', () => {
      it('should have a ".filters" element', () => {
        $(getFixture())
          .render()
          .find($.s`${TodoFooter} .filters`)
          .tap(collection => {
            expect(collection.length).toBe(1);
          });
      });
      it('should contain "All", "Active", and "Completed" links, in order', () => {
        const expected = ['All', 'Active', 'Completed'];
        $(getFixture())
          .render()
          .find($.s`${TodoFooter} .filters a`)
          .tap(collection => {
            collection.forEach((link, i) => {
              expect(link.textContent).toEqual(expected[i]);
            });
          })
          .unmount();
      });
      it('should only have one "selected" class at a time', () => {
        $(getFixture())
          .render()
          .find($.s`${TodoFooter} .filters a.selected`)
          .tap(collection => {
            expect(collection.length).toBe(1);
          })
          .unmount();
      });
      it('"selected" link should be "All" when "ALL_TODOS" is selected', () => {
        $(getFixture({ nowShowing: ALL_TODOS }))
          .render()
          .find($.s`${TodoFooter} .filters a.selected`)
          .tap(collection => {
            expect(collection.text()).toEqual('All');
          })
          .unmount();
      });
      it('"selected" link should be "Active" when "ACTIVE_TODOS" is selected', () => {
        $(getFixture({ nowShowing: ACTIVE_TODOS }))
          .render()
          .find($.s`${TodoFooter} .filters a.selected`)
          .tap(collection => {
            expect(collection.text()).toEqual('Active');
          })
          .unmount();
      });
      it('"selected" link should be "Completed" when "COMPLETED_TODOS" is selected', () => {
        $(getFixture({ nowShowing: COMPLETED_TODOS }))
          .render()
          .find($.s`${TodoFooter} .filters a.selected`)
          .tap(collection => {
            expect(collection.text()).toEqual('Completed');
          })
          .unmount();
      });
    });
    describe('Clear completed', () => {
      it('should not be visible when completedCount is 0', () => {
        $(getFixture({ completedCount: 0 }))
          .render()
          .find($.s`${TodoFooter} .clear-completed`)
          .tap(collection => {
            expect(collection.length).toBe(0);
          })
          .unmount();
      });
      it('should be visible when completedCount is greater than 0', () => {
        $(getFixture({ completedCount: 1 }))
          .render()
          .find($.s`${TodoFooter} .clear-completed`)
          .tap(collection => {
            expect(collection.length).toBe(1);
          })
          .unmount();
      });
      it('should call the clearCompleted callback when clicked', () => {
        const onClearCompletedFn = jasmine.createSpy('onClearCompleted');
        $(getFixture({
          completedCount: 1,
          onClearCompleted: onClearCompletedFn
        }))
          .render()
          .find($.s`${TodoFooter} .clear-completed`)
          .trigger('click')
          .tap(collection => {
            expect(onClearCompletedFn).toHaveBeenCalled();
          })
          .unmount();
      });
    });
  });
});
