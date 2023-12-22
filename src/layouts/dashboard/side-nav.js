import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import NextLink from 'next/link';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from 'src/hooks/use-auth';
import ButtonGroup from '@mui/material/ButtonGroup';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const buttons = [
  {
    label: "User",
    buttons: [
      {
        buttonText: "User Information",
        href: "/user-information",
        buttonStyle: {
          width: '639px',
          height: '111px',
          fontSize: '66px',
          fontWeight: 800,
          fontFamily: 'Anonymous Pro',
          color: '#FFFFFF',
          marginTop: '0px'
        },
      },
      {
        buttonText: "Update User",
        href: "/auth/update-data",
        buttonStyle: {
          width: '599px',
          height: '111px',
          fontSize: '66px',
          fontWeight: 800,
          fontFamily: 'Anonymous Pro',
          color: '#FFFFFF',
          marginTop: '90px'
        },
      },
      {
        buttonText: "LOG OUT",
        onClick: () => handleSignOut(auth, router, props.onClose),
        buttonStyle: {
          width: '599px',
          height: '111px',
          fontSize: '66px',
          fontWeight: 800,
          fontFamily: 'Anonymous Pro',
          color: '#FFFFFF',
          marginTop: '90px'
        },
      },
    ],
  },
  {
    label: "Toko",
    title: "Toko",
    description: "Description for dialog 2",
    buttons: [
      {
        buttonText: "Button 1",
        href: "/Toko",
      },
    ],
  },
  {
    label: "BecomeWaifu",
    title: "BecomeWaifu",
    desctitle: "System Transcript",
    desctitle2: "System Translate",
    desctitle3: "System Translate",
    description: "Waifu Answer your question in your bahasa",
    description2: "Waifu answer translate to japanese script",
    description3: "Japanese Script change to japanese Waifu dub",
    buttons: [
      {
        buttonText: "Let’s Change",
        href: "/become-waifu",
      },
    ],
  },
  {
    label: "AsistenWaifu",
    title: "Asisten-Waifu",
    desctitle: "Waifu Output",
    desctitle2: "Waifu Translate",
    desctitle3: "Waifu Talk",
    description: "Waifu Answer your question in your bahasa",
    description2: "Waifu answer translate to japanese script",
    description3: "Japanese Script change to japanese Waifu dub",
    buttons: [
      {
        buttonText: "Let’s Chat",
        href: "/asisten-waifu",
      },
    ],
  },
];

const dialogTitle = {
  fontSize: '66px',
  fontWeight: 700,
  fontFamily: 'Anonymous Pro, monospace',
  color: 'rgba(255, 255, 255, 0.90)',
  fontStyle: 'normal',
  textDecorationLine: 'underline',
  lineHeight: 'normal',
  marginTop: '40px'
};

const dialogDescription = {
  fontSize: '36px',
  fontWeight: 700,
  marginLeft: '2px',
  fontFamily: 'Anonymous Pro',
  color: 'rgba(255, 255, 255, 0.75)',
  textAlign: 'center',
  fontStyle: 'normal',
  lineHeight: 'normal'
};

const dialogButton = {
  width: '399px',
  height: '111px',
  fontSize: '48px',
  textDecorationLine: 'underline',
  fontWeight: 800,
  textDecoration: 'underline',
  fontFamily: 'Montserrat',
  color: '#FFFFFF',
  background: 'rgba(134, 134, 134, 0.50)',
  marginTop: '40px'
};

const dialogDescription2 = {
  fontSize: '36px',
  fontWeight: 700,
  marginLeft: '2px',
  fontFamily: 'Anonymous Pro',
  color: 'rgba(255, 255, 255, 0.75)',
  textAlign: 'center',
  fontStyle: 'normal',
  lineHeight: 'normal',
  marginLeft: '100px',
  marginRight: '100px',
};

const dialogdesctitle = {
  color: '#FFF',
  textAlign: 'center',
  fontFamily: 'Anonymous Pro',
  fontSize: '36px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal'
};

export const SideNav = (props) => {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: "", desctitle: "", desctitle2: "", desctitle3: "", description: "", description2: "", description3: "", buttonText: "", buttons: [] });
  const router = useRouter();
  const auth = useAuth();

  const handleSignOut = (auth, router, onClose) => {
    auth.signOut().then(() => {
      onClose?.();
      router.push('/auth/login');
    });
  };

  const handleClickOpen = (title, description, description2, description3, buttonText, buttons, desctitle, desctitle2, desctitle3,) => {
    setDialogContent({ title, description, description2, description3, buttonText, buttons, desctitle, desctitle2, desctitle3 });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Toolbar disableGutters>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <div>
            <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{
              transform: 'skew(-20deg)',
              border: '5px solid rgba(122, 128, 139, 0.60)',
              borderRadius: '15px',
              marginRight: '10px'
            }}>
              {buttons.slice(0, 2).map((button, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    if (button.buttons) {
                      setDialogContent({ title: button.title, description: button.description, description2: button.description2, description3: button.description3, buttonText: '', buttons: button.buttons, desctitle: button.desctitle, desctitle2: button.desctitle2, desctitle3: button.desctitle3, });
                    } else {
                      setDialogContent({ title: button.title, description: button.description, buttonText: button.buttonText, href: button.href });
                    }
                    if (button.onClick) {
                      button.onClick();
                    }
                    setOpen(true);
                  }}
                  sx={{
                    fontSize: '32px',
                    fontWeight: 600,
                    fontFamily: 'Anonymous Pro',
                    color: '#FFF',
                  }}
                >
                  {button.label}
                </Button>
              ))}
            </ButtonGroup>
            <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{
              transform: 'skew(-20deg)',
              border: '5px solid rgba(122, 128, 139, 0.60)',
              borderRadius: '15px',
              marginRight: '20px'
            }}>
              {buttons.slice(2).map((button, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    if (button.buttons) {
                      setDialogContent({ title: button.title, description: button.description, description2: button.description2, description3: button.description3, buttonText: '', buttons: button.buttons, desctitle: button.desctitle, desctitle2: button.desctitle2, desctitle3: button.desctitle3, });
                    } else {
                      setDialogContent({ title: button.title, description: button.description, buttonText: button.buttonText, href: button.href });
                    }
                    if (button.onClick) {
                      button.onClick();
                    }
                    setOpen(true);
                  }}
                  sx={{
                    fontSize: '32px',
                    fontWeight: 600,
                    fontFamily: 'Anonymous Pro',
                    color: '#FFF',
                  }}
                >
                  {button.label}
                </Button>
              ))}
            </ButtonGroup>
            <Dialog
              fullScreen
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
              PaperProps={{
                style: {
                  maxWidth: '50%',
                  width: '50%',
                  position: 'fixed',
                  left: 0,
                  top: 0,
                  background: 'rgba(159, 164, 170, 0.2)',
                }

              }}
            >
              <DialogContent>
                <div style={{ textAlign: 'center' }}>
                  <Typography style={dialogTitle}>{dialogContent.title}</Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                  <div style={{ marginRight: '5px' }}>
                    <Typography style={dialogdesctitle}>{dialogContent.desctitle}</Typography>
                    <Typography style={dialogDescription}>{dialogContent.description}</Typography>
                  </div>
                  <div style={{ marginLeft: '5px' }}>
                    <Typography style={dialogdesctitle}>{dialogContent.desctitle2}</Typography>
                    <Typography style={dialogDescription}>{dialogContent.description2}</Typography>
                  </div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                  <Typography style={dialogdesctitle}>{dialogContent.desctitle3}</Typography>
                  <Typography style={dialogDescription2}>{dialogContent.description3}</Typography>
                </div>
                {Array.isArray(dialogContent.buttons) && dialogContent.buttons.map((btn, btnIndex) => (
                  <NextLink key={btnIndex} href={btn.href || '/auth/login'} style={{ display: 'grid', placeItems: 'center', textDecoration: 'none' }}>
                    <Button style={btn.buttonStyle || dialogButton}>
                      {btn.buttonText}
                    </Button>
                  </NextLink>
                ))}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Toolbar>
  );
}