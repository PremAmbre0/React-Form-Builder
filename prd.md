# Form Builder Development Specification: Highly Modular Architecture (V1)

This document specifies the technical requirements and component breakdown for the initial version of the React Form Builder application. The architecture is designed for high modularity, using dedicated components for each responsibility and centralized state management via Zustand.

## 1. Core Technology and Setup

* **Framework:** React (Functional Components & Hooks).

* **State Management:** **Zustand** (Local, in-memory state only).

* **Styling:** **Tailwind CSS** (Full Dark Mode and responsiveness support).

* **Icons:** Use the `lucide-react` library for all UI icons.

* **Persistence:** Local only (Zustand store synchronizes the `allForms` array).

## 2. Component Hierarchy and Modularity Mandate


The application must be broken down into dedicated components and directories to maintain separation of concerns.

### A. Modular Component Groups

| **Component Group** | **Directory/Files** | **Key Responsibility** |
| :--- | :--- | :--- |
| **State Management** | `store/useFormStore.js` | Defines the global store, initial state, and all global actions (CRUD, navigation). |
| **Root/Layout** | `App.jsx`, `components/Layout.jsx` | Handles global theme toggle and orchestrates view switching based on Zustand's `currentView`. |
| **Views (Pages)** | `pages/HomePage.jsx`, `pages/BuilderPage.jsx`, `pages/PreviewPage.jsx` | Contains the layout and orchestrates the child components specific to that screen. |
| **Builder Modules** | `components/builder/*` | UI for form configuration and field management. |
| **Field Components** | `components/fields/*` | Renders a single, specific input type in the Preview View, managing its own local validation display. |
| **UI Utilities** | `components/ui/SubmissionModal.jsx`, `components/ui/Button.jsx` | Reusable generic UI elements. |

## 3. Data Model (Schemas and State)

### A. Data Schemas

The application revolves around the `FormDefinition` object and nested field schemas.

| **Schema** | **Key Fields** | **Notes** |
| :--- | :--- | :--- |
| **`FormDefinition`** | `id`, `title`, `description`, `accentColor`, `fields`, `createdAt` | `accentColor` must be a Tailwind utility class (e.g., `'indigo-600'`). |
| **`FieldSchema`** | `id`, `label`, `type`, `required`, `minLength`/`maxLength`, `min`/`max`, `pattern`, `options` | Validation properties are dynamic based on the field `type`. |

### B. Global State (`useFormStore.js`)

The store provides centralized access to the application state and mutation functions.

| **State Property** | **Type/Purpose** | **Core Actions** |
| :--- | :--- | :--- |
| `currentView` | `'Home' | 'Builder' | 'Preview'` | `setView()`, `loadForm()`, `createNewForm()` |
| `allForms` | `FormDefinition[]` (Local Array) | `loadAllForms()`, `saveForm()` (sync to array), `deleteForm()` |
| `activeForm` | `FormDefinition | null` | `loadForm()`, `createNewForm()`, `updateFormMetadata()`, `addField()`, `updateField()`, `removeField()` |
| `selectedFieldId`| `string | null` | `selectField()` |

## 4. Feature Implementation Details

### A. Builder Modules

| **Component** | **Responsibility** |
| :--- | :--- |
| **`MetadataEditor.jsx`** | Input for `title`, `description`. Swatch selector for `accentColor`. Calls `updateFormMetadata`. |
| **`FieldList.jsx`** | Lists fields. Uses `FieldListItem.jsx` children. Handles field reordering (future V2) and delegates selection/deletion actions to the store. |
| **`ConfigEditor.jsx`** | Displays properties of the field selected by `selectedFieldId`. Dynamically renders the correct validation inputs (`MinLength`, `Max`, `Options`) based on `field.type`, calling `updateField`. |

### B. Client-Side Validation System

Validation is split between a utility and the Preview View components.

1. **Validation Utility (`utils/validation.js`):** Contains the pure function `validateField(fieldSchema, value)` which performs all checks (required, length, pattern, min/max) and returns an error message string or `null`.

2. **Field Components (`components/fields/*`):**

   * **Responsibility:** Each component manages the input element.

   * **Logic:** On input change (`onChange`) or focus loss (`onBlur`), the component calls the `validateField` utility, updates its local validation state, and reports its value and error status back up to the `PreviewPage`.

   * **Styling:** **MUST** apply the `accentColor` prop for focus states (`focus:ring-{{accentColor}}`) and checked state colors (for radios/checkboxes).

3. **Preview Page (`PreviewPage.jsx`):**

   * **State:** Manages the main submission state (`formData`) and the collection of errors (`validationErrors: { [fieldId: string]: string | null }`).

   * **Submit Control:** The submit button is disabled if `Object.values(validationErrors)` contains any non-null error strings.

   * **Submission:** On success, clears the form and opens the **`SubmissionModal`** with the `formData` JSON.

### C. Preview Field Requirements

Field components must be highly modular and dedicated to one type.

* **V1 Minimum:** Implement `TextInput.jsx`, `EmailInput.jsx`, `NumberInput.jsx`, and `TextArea.jsx`.

* **V2 Future:** Implement `SelectInput.jsx`, `CheckboxGroup.jsx`, and `RadioGroup.jsx`, ensuring they correctly handle rendering `field.options`.