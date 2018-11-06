// @flow
/*
 * Backend interface types.
 */

export type APIUser = {|
  id: number,
  default_organization: number,
  email: string,
  email_verified: boolean,
  full_name: string,
  date_joined: string,
|}

export type User = {|
  id: number,
  defaultOrganization: number,
  email: string,
  emailVerified: boolean,
  fullName: string,
  dateJoined: Date,
|}

export type Organization = {|
  id: number,
  company: string,
  location: string,
  name: string,
  slug: string,
  email: string,
  url: string,
|}

export type Project = {|
  id: number,
  slug: string,
  name: string,
|}

export type APISession =
  {|
   logged_in: boolean,
   user: APIUser,
   organization: Organization,
   project: Project,
   |}

export type Session =
  {|
   loggedIn: boolean,
   user: User,
   organization: Organization,
   project: Project,
   |}

export type SignupInput = {|
  name: string,
  email: string,
  password: string,
  organization_company: string,
  organization_location: string,
  organization_company_url: string,
|}
