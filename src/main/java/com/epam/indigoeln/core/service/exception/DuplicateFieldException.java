package com.epam.indigoeln.core.service.exception;

import com.epam.indigoeln.web.rest.errors.CustomParametrizedException;

public class DuplicateFieldException extends CustomParametrizedException {

    private static final long serialVersionUID = -2792167348160969142L;

    public DuplicateFieldException(String message, String params) {
        this(message, null, params);
    }

    public DuplicateFieldException(String message, Exception e, String params) {
        super(message, e, params);
    }

    public static DuplicateFieldException createWithNotebookName(String name, Exception e) {
        return new DuplicateFieldException("Notebook name " + name + " is already in use", e, name);
    }

    public static DuplicateFieldException createWithProjectName(String name, Exception e) {
        return new DuplicateFieldException("Project name " + name + " is already in use", e, name);
    }

    public static DuplicateFieldException createWithTemplateName(String name, Exception e) {
        return new DuplicateFieldException("Template name " + name + " is already in use", e, name);
    }

    public static DuplicateFieldException createWithUserLogin(String login) {
        return new DuplicateFieldException("Login " + login + " is already in use", login);
    }

    public static DuplicateFieldException createWithRoleName(String name, Exception e) {
        return new DuplicateFieldException("Role name " + name + " is already in use", e, name);
    }

}
