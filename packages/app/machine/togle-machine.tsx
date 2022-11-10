import { assign, createMachine } from 'xstate'

export interface ToggleContext {
  count: number
}

export const toggleMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCWAdgIYDGyeAbmAMQAqA8gOKMAyAogNoAMAuoqAAdUsPOVQF+IAB6IAjAFYA7DkUAOAJxd56xQDZ1q3fPkAaEAE85AFgBMOWbse6AzEvnPZq+TYC+Ps2gY2Dik5FR0TKycvJJCImISSNJySioaWjr6hsZmlgia9k4uzurqulaO8n7+IASoEHCSgVi4hKGUYLHConjikjIItrmIZThWpaW6ejY28oa+Nc3B7VRd8b2JoAM2qs44XAq6NgcOO1yqVsMIqnYTEzOqiornzn4B6C1rPX1JAwC0uiuAP2XFBYPBYMU1R8QA */
  createMachine<ToggleContext>({
    context: { count: 0 },
    id: 'toggle',
    initial: 'inactive',
    states: {
      inactive: {
        on: {
          TOGGLE: 'active',
        },
      },
      active: {
        entry: assign({ count: (ctx) => ctx.count + 1 }),
        on: {
          TOGGLE: 'inactive',
        },
      },
    },
  })
