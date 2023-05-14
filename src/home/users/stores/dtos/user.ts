interface Permission {
  name: string
}

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly permissions: Permission[]
  ) {}

  public canManageUsers(): boolean {
    return (
      this.permissions.find((permission: Permission) => permission.name === 'manage-users') !==
      undefined
    )
  }

  public canManageVouchers(): boolean {
    return (
      this.permissions.find((permission: Permission) => permission.name === 'manage-vouchers') !==
      undefined
    )
  }

  public canManagePurchaseRecords(): boolean {
    return (
      this.permissions.find(
        (permission: Permission) => permission.name === 'manage-purchase-records'
      ) !== undefined
    )
  }

  public canManageInventory(): boolean {
    return (
      this.permissions.find((permission: Permission) => permission.name === 'manage-inventory') !==
      undefined
    )
  }
}
