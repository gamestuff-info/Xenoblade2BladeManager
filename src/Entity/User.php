<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\AdvancedUserInterface;
use Symfony\Component\Security\Core\Validator\Constraints as SecurityAssert;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 * @UniqueEntity("email", groups={"registration", "edit"})
 */
class User implements AdvancedUserInterface, \Serializable
{

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * The user's password may be blank if they only authenticate with an OAuth
     * provider.
     *
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    private $password;

    /**
     * @var string
     *
     * @Assert\NotBlank(groups={"registration", "passwordChange"})
     * @Assert\Length(max=4096, groups={"registration", "passwordChange"})
     */
    private $plainPassword;

    /**
     * @var string
     *
     * @SecurityAssert\UserPassword(groups={"edit"})
     */
    private $oldPassword;

    /**
     * @var string
     *
     * @ORM\Column(type="string", unique=true)
     * @Assert\NotBlank(groups={"registration", "edit"})
     * @Assert\Email(groups={"registration", "edit"})
     */
    private $email;

    /**
     * @var bool
     *
     * @ORM\Column(type="boolean")
     */
    private $isActive = false;

    /**
     * @var Collection|Role[]
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Role")
     */
    private $roles;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime")
     * @Gedmo\Timestampable(on="create")
     */
    private $created;

    /**
     * @var string
     *
     * @ORM\Column(type="string", nullable=true)
     */
    private $activateCode;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime", nullable=true)
     * @Gedmo\Timestampable(on="change", field={"activateCode"})
     */
    private $activateCodeTime;

    /**
     * @var Collection|Nation[]
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Nation")
     */
    private $nations;

    /**
     * @var Collection|Driver[]
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Driver")
     */
    private $drivers;

    /**
     * Google Sign-In Id
     *
     * @var string
     *
     * @ORM\Column(type="string", unique=true, nullable=true);
     */
    private $googleId;

    /**
     * User constructor.
     */
    public function __construct()
    {
        $this->roles = new ArrayCollection();
        $this->nations = new ArrayCollection();
        $this->drivers = new ArrayCollection();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Returns the username used to authenticate the user.
     *
     * @return string The username
     */
    public function getUsername(): ?string
    {
        return $this->email;
    }

    /**
     * Returns the password used to authenticate the user.
     *
     * This should be the encoded password. On authentication, a plain-text
     * password will be salted, encoded, and then compared to this value.
     *
     * @return string The password
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    /**
     * @param string $password
     *
     * @return self
     */
    public function setPassword(?string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return string
     */
    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    /**
     * @param string $plainPassword
     *
     * @return self
     */
    public function setPlainPassword(string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    /**
     * @return string
     */
    public function getOldPassword(): ?string
    {
        return $this->oldPassword;
    }

    /**
     * @param string $oldPassword
     *
     * @return self
     */
    public function setOldPassword(string $oldPassword): self
    {
        $this->oldPassword = $oldPassword;

        return $this;
    }

    /**
     * @return string
     */
    public function getEmail(): ?string
    {
        return $this->email;
    }

    /**
     * @param string $email
     *
     * @return self
     */
    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Returns the roles granted to the user.
     *
     * @return string[] The user roles
     */
    public function getRoles(): array
    {
        $roles = [];

        foreach ($this->roles as $role) {
            $roles[] = $role->getName();
        }

        return $roles;
    }

    /**
     * @param Role[]|Collection $roles
     *
     * @return self
     */
    public function setRoles($roles)
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @return Collection|Role[]
     */
    public function getRoleEntities(): Collection
    {
        return $this->roles;
    }

    /**
     * @param Role $role
     *
     * @return self
     */
    public function addRole(Role $role): self
    {
        if (!$this->roles->contains($role)) {
            $this->roles->add($role);
        }

        return $this;
    }

    /**
     * @param Role $role
     *
     * @return self
     */
    public function removeRole(Role $role): self
    {
        $this->roles->removeElement($role);

        return $this;
    }

    /**
     * String representation of object
     *
     * @link http://php.net/manual/en/serializable.serialize.php
     * @return string the string representation of the object or null
     * @since 5.1.0
     */
    public function serialize()
    {
        return serialize(
          [
            $this->id,
            $this->email,
            $this->password,
            $this->isActive,
          ]
        );
    }

    /**
     * Constructs the object
     *
     * @link http://php.net/manual/en/serializable.unserialize.php
     *
     * @param string $serialized <p>
     * The string representation of the object.
     * </p>
     *
     * @return void
     * @since 5.1.0
     */
    public function unserialize($serialized)
    {
        list(
          $this->id,
          $this->email,
          $this->password,
          $this->isActive
          ) = unserialize($serialized);
    }

    /**
     * Returns the salt that was originally used to encode the password.
     *
     * This can return null if the password was not encoded using a salt.
     *
     * @return string|null The salt
     */
    public function getSalt()
    {
        return null;
    }

    /**
     * Removes sensitive data from the user.
     *
     * This is important if, at any given point, sensitive information like
     * the plain-text password is stored on this object.
     */
    public function eraseCredentials()
    {
        $this->plainPassword = null;
    }

    /**
     * Checks whether the user's account has expired.
     *
     * Internally, if this method returns false, the authentication system
     * will throw an AccountExpiredException and prevent login.
     *
     * @return bool true if the user's account is non expired, false otherwise
     *
     * @see AccountExpiredException
     */
    public function isAccountNonExpired()
    {
        return true;
    }

    /**
     * Checks whether the user is locked.
     *
     * Internally, if this method returns false, the authentication system
     * will throw a LockedException and prevent login.
     *
     * @return bool true if the user is not locked, false otherwise
     *
     * @see LockedException
     */
    public function isAccountNonLocked()
    {
        return true;
    }

    /**
     * Checks whether the user's credentials (password) has expired.
     *
     * Internally, if this method returns false, the authentication system
     * will throw a CredentialsExpiredException and prevent login.
     *
     * @return bool true if the user's credentials are non expired, false
     *   otherwise
     *
     * @see CredentialsExpiredException
     */
    public function isCredentialsNonExpired()
    {
        return true;
    }

    /**
     * Checks whether the user is enabled.
     *
     * Internally, if this method returns false, the authentication system
     * will throw a DisabledException and prevent login.
     *
     * @return bool true if the user is enabled, false otherwise
     *
     * @see DisabledException
     */
    public function isEnabled()
    {
        return $this->isActive();
    }

    /**
     * @return bool
     */
    public function isActive(): bool
    {
        return $this->isActive;
    }

    /**
     * Activate this user.
     *
     * @return self
     */
    public function activate(): self
    {
        $this->isActive = true;
        $this->activateCode = null;
        $this->activateCodeTime = null;

        return $this;
    }

    /**
     * Deactivate this user.
     *
     * @return self
     */
    public function deactivate(): self
    {
        $this->isActive = false;

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCreated(): \DateTime
    {
        return $this->created;
    }

    /**
     * Generate a new activation code for this user.
     *
     * @return string
     */
    public function newActivateCode(): string
    {
        $this->isActive = false;
        $this->activateCode = bin2hex(openssl_random_pseudo_bytes(16));
        $this->activateCodeTime = new \DateTime();

        return $this->activateCode;
    }

    /**
     * @return string
     */
    public function getActivateCode(): string
    {
        return $this->activateCode;
    }

    /**
     * @return \DateTime
     */
    public function getActivateCodeTime(): \DateTime
    {
        return $this->activateCodeTime;
    }

    /**
     * @return Nation[]|Collection
     */
    public function getNations()
    {
        return $this->nations;
    }

    /**
     * @param Nation[]|Collection $nations
     *
     * @return self
     */
    public function setNations($nations)
    {
        $this->nations = $nations;

        return $this;
    }

    /**
     * @param Nation $nation
     *
     * @return self
     */
    public function addNation(Nation $nation): self
    {
        if (!$this->nations->contains($nation)) {
            $this->nations->add($nation);
        }

        return $this;
    }

    /**
     * @param Nation $nation
     *
     * @return self
     */
    public function removeNation(Nation $nation): self
    {
        $this->nations->removeElement($nation);

        return $this;
    }

    /**
     * @return Driver[]|Collection
     */
    public function getDrivers()
    {
        return $this->drivers;
    }

    /**
     * @param Driver $driver
     *
     * @return self
     */
    public function addDriver(Driver $driver): self
    {
        if (!$this->drivers->contains($driver)) {
            $this->drivers->add($driver);
        }

        return $this;
    }

    /**
     * @param Driver $driver
     *
     * @return self
     */
    public function removeDriver(Driver $driver): self
    {
        $this->drivers->removeElement($driver);

        return $this;
    }

    /**
     * @return bool
     */
    public function usesOAuth(): bool
    {
        return !is_null($this->googleId);
    }

    /**
     * @return string|null
     */
    public function getGoogleId(): ?string
    {
        return $this->googleId;
    }

    /**
     * @param string|null $googleId
     *
     * @return self
     */
    public function setGoogleId(?string $googleId): self
    {
        $this->googleId = $googleId;

        return $this;
    }
}
