import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EventService, HttpService, LocalStorageService } from '.';
import { StorageKeys } from '../config';
import { LoginResponseModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private eventService :EventService,
    // private httpService: HttpService,
    // private appConfigService: AppConfigService,
    private localStorageService: LocalStorageService
  ) { }

  // refreshToken() {
  //   return this.httpService.post(ApiEndpoints.Token.Refresh, {
  //     'accessToken': this.getAuthToken(),
  //     'refreshToken': this.getRefreshToken()
  //   }).pipe(tap((tokens: any) => {
  //     this.storeTokens(tokens.accessToken, tokens.refreshToken);
  //   }));
  // }

  logout() {
    this.clearStorage(); 
    this.router.navigateByUrl(''); 
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    if (token) return true;
    return false;
  }

  getAuthToken() {
    return this.localStorageService.get(StorageKeys.AuthToken);
    // return sessionStorage.getItem("token");
  }

 storeAuthToken(token: string) {
  this.localStorageService.set(StorageKeys.AuthToken, token);
}

setUserDetails(userData: LoginResponseModel) {
  this.localStorageService.set(StorageKeys.UserDetails, JSON.stringify(userData));
}

clearStorage() {
  this.localStorageService.remove(StorageKeys.AuthToken);
  this.localStorageService.remove(StorageKeys.UserDetails);
  this.localStorageService.clear();
}

  // getAllRoles(): Role[] {
  //   return this.appConfigService.getAllRolesPermissions();
  // }

  // getUserPermissions() {
  //   const allRolesPermission = this.appConfigService.getAllRolesPermissions();

  //   const userCurrentRole = this.getUserCurrentRole();
  //   const rolePermission = allRolesPermission.find(rp => rp.roleName == userCurrentRole);

  //   return rolePermission?.listRolePermissions || [];
  // }

  // permissionIsGranted(permission: string) {
  //   const userPermissions = this.getUserPermissions();
  //   const allAccess = userPermissions.findIndex(up => up.permissionName == Permission.AllAccess);
  //   return (allAccess > -1) ? true : userPermissions.findIndex(up => up.permissionName == permission) > -1;
  // }

  // getRolePermissionsNameArray() {
  //   const permissionNames: string[] = [];
  //   const permissions = this.getUserPermissions();
  //   permissions.forEach(permission => {
  //     permissionNames.push(permission.permissionName);
  //   });
  //   const hasAllAccess = permissionNames.includes(Permission.AllAccess);
  //   return hasAllAccess ? this.staticPermissionArr : permissionNames;
  // }


  // isLocalStorageSessionExist() {
  //   const authToken = this.localStorageService.get(StorageKeys.AuthToken);
  //   return !!authToken;
  // }

  // getLandingPageRoute() {
    // return "point-compare";

   // const userPermissions = this.getUserPermissions();
   // TODO: Need to change after proforma management module
   // const index = userPermissions.findIndex(up => up.permissionName == Permission.UserManagement);
   // return index > -1 ? "admin" : "home";
//  }

  // getRefreshToken() {
  //   return this.localStorageService.get(StorageKeys.RefreshToken);
  // }

  getUserDetails() {
    const user = this.localStorageService.get(StorageKeys.UserDetails);
    if (user) return JSON.parse(user);
    return null;
  }

  // getUserCurrentRole() {
  //   if (this.isMimicUserSessionExist()) return this.sessionStorageService.get(StorageKeys.UserCurrentRole);

  //   return this.localStorageService.get(StorageKeys.UserCurrentRole);
  // }

  // getAllUserRoles() {
  //   const userDetails = this.getUserDetails();
  //   if (!userDetails) return [];

  //   const roles = (userDetails as UserDetails).roles || []
  //   return roles;
  // }

  // checkCurrentRoleExistInUserRoles() {
  //   const currentRole = this.getUserCurrentRole();
  //   const roles = this.getAllUserRoles();
  //   return roles.findIndex(r => r.roleName == currentRole) > -1;
  // }




  // getAdditionalVisibleColumns(grid: Grid): string[] {
  //   const columnsArrString = this.isMimicUserSessionExist() ?
  //     this.sessionStorageService.get(grid) :
  //     this.localStorageService.get(grid);
  //   if (columnsArrString) return JSON.parse(columnsArrString);
  //   return [];
  // }

  // storeTokens(token: string, refreshToken: string, isMimicUserSession: boolean = false) {
  //   this.storeAuthToken(token, isMimicUserSession);
  //   this.storeRefreshToken(refreshToken, isMimicUserSession);
  // }



  // storeRefreshToken(token: string, isMimicUserSession: boolean = false) {
  //   if (isMimicUserSession) this.sessionStorageService.set(StorageKeys.RefreshToken, token);
  //   else this.localStorageService.set(StorageKeys.RefreshToken, token);
  // }

  // storeCurrentRole(role?: string, isMimicUserSession: boolean = false) {
  //   if (isMimicUserSession) this.sessionStorageService.set(StorageKeys.UserCurrentRole, role);
  //   else this.localStorageService.set(StorageKeys.UserCurrentRole, role);
  // }



  // storeAdditionalVisibleColumns(grid: Grid, columns: string[], isMimicUserSession: boolean = false) {
  //   if (isMimicUserSession) this.sessionStorageService.set(grid, JSON.stringify(columns));
  //   else this.localStorageService.set(grid, JSON.stringify(columns));
  // }

  // clearStorage() {
  //   this.localStorageService.remove(StorageKeys.AuthToken);
  //   this.localStorageService.clear();

  //   // this.localStorageService.remove(StorageKeys.RefreshToken);
  //   // this.localStorageService.remove(StorageKeys.UserCurrentRole);
  //   // this.sessionStorageService.clear();
  // }

  // staticPermissionArr = [
  // "AllAccess", "UserManagement", "RoleManagement", "ProformaManagement",
  // "OtherListsManagement", "LogsManagement", "ReportingManagement", "ProxyAssignments",   
  // "AbilityToProxy",    "AllAvailbleProformas", "EditAdjustments", "ABRFileUploads", "SaveUpdates", 
  // "SaveABR", "SubmitABR", "PendingByGOT", "ProcessedByGOT", "RejectedByGOT", "RowFilters", "ColumnFilters",
  // ]

  getselectedDatelang(){
    const lang = sessionStorage.getItem("lang")
    let selectedLanguage
    this.eventService.currentLanguage.subscribe((data: any) => {
        if(data == 'jp'){
          return selectedLanguage = data
        }else if(data == 'en'){
          return selectedLanguage = data
        }else{
          if(lang){
            if( lang == 'en'){
              return selectedLanguage = lang;
            }if( lang == 'jp'){
              return selectedLanguage = lang;
            }
          }
        }
      });
   }
}
