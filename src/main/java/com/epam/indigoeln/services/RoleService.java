package com.epam.indigoeln.services;

import com.epam.indigoeln.documents.Role;
import com.epam.indigoeln.documents.RolePermission;

import java.util.Collection;

public interface RoleService {

    void addRole(Role role);
    void deleteRole(String id);
    Collection<Role> getRoles(Collection<String> rolesIds);

    void addRolePermission(String roleId, String permission);
    void deleteRolePermission(String roleId, String permission);
    Collection<RolePermission> getRolesPermissions(Collection<String> rolesIds);

}
